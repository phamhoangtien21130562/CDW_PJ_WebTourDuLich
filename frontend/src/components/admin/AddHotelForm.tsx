import React, { useState } from 'react';
import {
    Container,
    Card,
    Button,
    Row,
    Col,
    Image,
    Form as BootstrapForm,
} from 'react-bootstrap';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const AddHotelForm = () => {
    const navigate = useNavigate();
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [subImagePreviews, setSubImagePreviews] = useState([]);

    const initialValues = {
        hotelName: '',
        address: '',
        description: '',
        mainImage: null,
        subImages: [null],
        amenities: [''],
        roomTypes: [
            {
                type: '',
                price: '',
                description: '',
            },
        ],
        notes: [''],
    };

    const validationSchema = Yup.object().shape({
        hotelName: Yup.string().required('Tên khách sạn là bắt buộc'),
        address: Yup.string().required('Địa chỉ là bắt buộc'),
        description: Yup.string().required('Mô tả là bắt buộc'),
        amenities: Yup.array().of(Yup.string().required('Tiện nghi không được để trống')),
        roomTypes: Yup.array().of(
            Yup.object().shape({
                type: Yup.string().required('Loại phòng là bắt buộc'),
                price: Yup.string().required('Giá là bắt buộc'),
                description: Yup.string().required('Mô tả là bắt buộc'),
            })
        ),
        notes: Yup.array().of(Yup.string().required('Ghi chú không được để trống')),
    });

    const handleMainImageChange = (e, setFieldValue) => {
        const file = e.currentTarget.files[0];
        setFieldValue('mainImage', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setMainImagePreview(null);
        }
    };

    const handleSubImageChange = (e, index, setFieldValue) => {
        const file = e.currentTarget.files[0];
        setFieldValue(`subImages[${index}]`, file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSubImagePreviews((prev) => {
                    const newPreviews = [...prev];
                    newPreviews[index] = reader.result;
                    return newPreviews;
                });
            };
            reader.readAsDataURL(file);
        } else {
            setSubImagePreviews((prev) => {
                const newPreviews = [...prev];
                newPreviews[index] = null;
                return newPreviews;
            });
        }
    };

    const handleAddSubImage = (push) => {
        push(null);
        setSubImagePreviews((prev) => [...prev, null]);
    };

    const handleRemoveSubImage = (index, remove) => {
        remove(index);
        setSubImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        // Xử lý gửi dữ liệu ở đây
        console.log('Submitted values:', values);
        toast.success('Khách sạn đã được thêm thành công!');
        setSubmitting(false);
        navigate('/admin/hotels');
    };

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <h2 className="mb-4">Thêm Khách Sạn</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, isSubmitting, setFieldValue }) => (
                            <Form>
                                {/* Thông tin cơ bản */}
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <BootstrapForm.Label>Tên Khách Sạn</BootstrapForm.Label>
                                        <Field
                                            name="hotelName"
                                            className="form-control"
                                            placeholder="Nhập tên khách sạn"
                                        />
                                        <ErrorMessage
                                            name="hotelName"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <BootstrapForm.Label>Địa Chỉ</BootstrapForm.Label>
                                        <Field
                                            name="address"
                                            className="form-control"
                                            placeholder="Nhập địa chỉ"
                                        />
                                        <ErrorMessage
                                            name="address"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={12}>
                                        <BootstrapForm.Label>Mô Tả</BootstrapForm.Label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            className="form-control"
                                            placeholder="Nhập mô tả"
                                        />
                                        <ErrorMessage
                                            name="description"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </Col>
                                </Row>

                                {/* Ảnh chính */}
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <BootstrapForm.Label>Ảnh Chính</BootstrapForm.Label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={(e) => handleMainImageChange(e, setFieldValue)}
                                        />
                                        {mainImagePreview && (
                                            <Image
                                                src={mainImagePreview}
                                                thumbnail
                                                alt="Ảnh chính"
                                                className="mt-2"
                                                style={{ maxHeight: '200px' }}
                                            />
                                        )}
                                    </Col>
                                </Row>

                                {/* Ảnh phụ */}
                                <h3>Ảnh Phụ</h3>
                                <FieldArray name="subImages">
                                    {({ push, remove }) => (
                                        <>
                                            {values.subImages.map((_, index) => (
                                                <Row key={index} className="align-items-center mb-3">
                                                    <Col md={10}>
                                                        {subImagePreviews[index] && (
                                                            <Image
                                                                src={subImagePreviews[index]}
                                                                thumbnail
                                                                alt={`Ảnh phụ ${index + 1}`}
                                                                style={{ maxHeight: '150px' }}
                                                                className="mb-2"
                                                            />
                                                        )}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="form-control"
                                                            onChange={(e) =>
                                                                handleSubImageChange(e, index, setFieldValue)
                                                            }
                                                        />
                                                    </Col>
                                                    <Col md={2}>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleRemoveSubImage(index, remove)}
                                                            disabled={values.subImages.length === 1}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            ))}
                                            <Button variant="primary" onClick={() => handleAddSubImage(push)}>
                                                Thêm Ảnh Phụ
                                            </Button>
                                        </>
                                    )}
                                </FieldArray>

                                <hr />

                                {/* Tiện nghi */}
                                <h3>Tiện Nghi</h3>
                                <FieldArray name="amenities">
                                    {({ push, remove }) => (
                                        <>
                                            {values.amenities.map((_, index) => (
                                                <Row key={index} className="align-items-center mb-2">
                                                    <Col md={10}>
                                                        <Field
                                                            name={`amenities[${index}]`}
                                                            className="form-control"
                                                            placeholder={`Tiện nghi ${index + 1}`}
                                                        />
                                                        <ErrorMessage
                                                            name={`amenities[${index}]`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Col>
                                                    <Col md={2}>
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => remove(index)}
                                                            disabled={values.amenities.length === 1}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            ))}
                                            <Button variant="primary" onClick={() => push('')}>
                                                Thêm Tiện Nghi
                                            </Button>
                                        </>
                                    )}
                                </FieldArray>

                                <hr />

                                {/* Loại phòng */}
                                <h3>Loại Phòng</h3>
                                <FieldArray name="roomTypes">
                                    {({ push, remove }) => (
                                        <>
                                            {values.roomTypes.map((room, index) => (
                                                <Row key={index} className="mb-3">
                                                    <Col md={3}>
                                                        <BootstrapForm.Label>Loại Phòng</BootstrapForm.Label>
                                                        <Field
                                                            name={`roomTypes[${index}].type`}
                                                            className="form-control"
                                                            placeholder="Nhập loại phòng"
                                                        />
                                                        <ErrorMessage
                                                            name={`roomTypes[${index}].type`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <BootstrapForm.Label>Giá</BootstrapForm.Label>
                                                        <Field
                                                            name={`roomTypes[${index}].price`}
                                                            className="form-control"
                                                            placeholder="Nhập giá"
                                                        />
                                                        <ErrorMessage
                                                            name={`roomTypes[${index}].price`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <BootstrapForm.Label>Mô Tả</BootstrapForm.Label>
                                                        <Field
                                                            name={`roomTypes[${index}].description`}
                                                            className="form-control"
                                                            placeholder="Nhập mô tả"
                                                        />
                                                        <ErrorMessage
                                                            name={`roomTypes[${index}].description`}
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </Col>
                                                    <Col md={2} className="d-flex align-items-end">
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => remove(index)}
                                                            disabled={values.roomTypes.length === 1}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            ))}
                                            <Button
                                                variant="primary"
                                                on
                                            ::contentReference[oaicite:4]{index=4}

