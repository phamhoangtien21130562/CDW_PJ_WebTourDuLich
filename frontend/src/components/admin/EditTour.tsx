import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form as BootstrapForm,
  Container,
  Row,
  Col,
  Card,
  Image,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TourValues {
  title: string;
  tourCode: string;
  departure: string;
  destination: string;
  duration: string;
  transport: string;
  price: string;
  startDate: string;
  endDate: string;
  deleted: boolean;
  availabilityStatus: string;
  experiences: string[];
  schedule: { dayNumber: number; description: string }[];
  departureSchedules: { departureDate: string; price: string; status: string }[];
  notes: string[];
  subImageUrls: string[];
}

const EditTour: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<TourValues | null>(null);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");

  // Sub images state and previews
  const [subImageFiles, setSubImageFiles] = useState<(File | null)[]>([]);
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tours/${id}`)
      .then((res) => {
        const data = res.data as TourValues & { mainImageUrl?: string; subImageUrls?: string[] };
        // Load initial values from API
        setInitialValues({
          title: data.title || "",
          tourCode: data.tourCode || "",
          departure: data.departure || "",
          destination: data.destination || "",
          duration: data.duration || "",
          transport: data.transport || "",
          price: data.price || "",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          deleted: data.deleted || false,
          availabilityStatus: data.availabilityStatus || "Còn chỗ",
          experiences: data.experiences && data.experiences.length > 0 ? data.experiences : [""],
          schedule: data.schedule && data.schedule.length > 0 ? data.schedule : [{ dayNumber: 1, description: "" }],
          departureSchedules:
            data.departureSchedules && data.departureSchedules.length > 0
              ? data.departureSchedules
              : [{ departureDate: "", price: "", status: "" }],
          notes: data.notes && data.notes.length > 0 ? data.notes : [""],
          subImageUrls: data.subImageUrls && data.subImageUrls.length > 0 ? data.subImageUrls : [""],
        });

        // Main image preview from backend url if any
        if (data.mainImageUrl) {
       setMainImagePreview(`http://localhost:8080/loadImage?imageName=${encodeURIComponent(data.mainImageUrl)}`);

        }

        // Sub images previews from backend urls
        if (data.subImageUrls && data.subImageUrls.length > 0) {
        setSubImagePreviews(
  data.subImageUrls.map(
    (url) => `http://localhost:8080/loadImage?imageName=${encodeURIComponent(url)}`
  )
);

          setSubImageFiles(new Array(data.subImageUrls.length).fill(null)); // initially no new files
        } else {
          setSubImagePreviews([""]);
          setSubImageFiles([null]);
        }
      })
      .catch((err) => {
        toast.error("Không tìm thấy tour");
        navigate("/admin/tours");
      });
  }, [id, navigate]);

  if (!initialValues) return <div>Đang tải dữ liệu tour...</div>;

  const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề tour là bắt buộc"),
    tourCode: Yup.string().required("Mã tour là bắt buộc"),
    departure: Yup.string().required("Khởi hành là bắt buộc"),
    destination: Yup.string().required("Điểm đến là bắt buộc"),
    duration: Yup.string().required("Thời gian là bắt buộc"),
    transport: Yup.string().required("Phương tiện là bắt buộc"),
    price: Yup.string().required("Giá tour là bắt buộc"),
    startDate: Yup.string().required("Ngày khởi hành là bắt buộc"),
    endDate: Yup.string().required("Ngày kết thúc là bắt buộc"),
    deleted: Yup.boolean(),
    availabilityStatus: Yup.string().required("Trạng thái tour là bắt buộc"),
    experiences: Yup.array()
      .of(Yup.string().required("Trải nghiệm không được bỏ trống"))
      .min(1, "Phải có ít nhất 1 trải nghiệm"),
    schedule: Yup.array()
      .of(
        Yup.object({
          dayNumber: Yup.number().required(),
          description: Yup.string().required("Mô tả ngày không được bỏ trống"),
        })
      )
      .min(1, "Phải có ít nhất 1 ngày trong lịch trình"),
    departureSchedules: Yup.array()
      .of(
        Yup.object({
          departureDate: Yup.string().required("Ngày khởi hành bắt buộc"),
          price: Yup.string().required("Giá bắt buộc"),
          status: Yup.string().required("Trạng thái bắt buộc"),
        })
      )
      .min(1, "Phải có ít nhất 1 lịch khởi hành"),
    notes: Yup.array()
      .of(Yup.string().required("Thông tin lưu ý không được bỏ trống"))
      .min(1, "Phải có ít nhất 1 lưu ý"),
  });

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImageFile(file);
      const base64 = await fileToBase64(file);
      setMainImagePreview(base64);
    }
  };

  const handleSubImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: (field: string, value: any) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFiles = [...subImageFiles];
      newFiles[index] = file;
      setSubImageFiles(newFiles);

      const base64 = await fileToBase64(file);
      const newPreviews = [...subImagePreviews];
      newPreviews[index] = base64;
      setSubImagePreviews(newPreviews);

      setFieldValue(`subImageUrls[${index}]`, base64);
    }
  };

  const handleAddSubImage = (push: (value: any) => void) => {
    push("");
    setSubImageFiles([...subImageFiles, null]);
    setSubImagePreviews([...subImagePreviews, ""]);
  };

  const handleRemoveSubImage = (
    index: number,
    values: any,
    setFieldValue: (field: string, value: any) => void,
    remove: (index: number) => void
  ) => {
    const newFiles = [...subImageFiles];
    newFiles.splice(index, 1);
    setSubImageFiles(newFiles);

    const newPreviews = [...subImagePreviews];
    newPreviews.splice(index, 1);
    setSubImagePreviews(newPreviews);

    const newSubImageUrls = [...values.subImageUrls];
    newSubImageUrls.splice(index, 1);
    setFieldValue("subImageUrls", newSubImageUrls);

    remove(index);
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <h2 className="mb-4">Chỉnh sửa Tour</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const formData = new FormData();
                formData.append("tour", new Blob([JSON.stringify(values)], { type: "application/json" }));

                if (mainImageFile) {
                  formData.append("mainImage", mainImageFile);
                }

                // Append subImages files if any new files selected
                subImageFiles.forEach((file) => {
                  if (file) formData.append("subImages", file);
                });

                await axios.put(`http://localhost:8080/api/tours/${id}`, formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });

                toast.success("Cập nhật tour thành công");
                navigate("/admin/tours");
              } catch (error) {
                console.error(error);
                toast.error("Lỗi khi cập nhật tour");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form>
                {/* Tiêu đề */}
                <Row className="mb-3">
                  <Col md={12}>
                    <BootstrapForm.Label>Tiêu đề Tour</BootstrapForm.Label>
                    <Field name="title" className="form-control" placeholder="Nhập tiêu đề tour" />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                  </Col>
                </Row>

                {/* Thông tin chung */}
                <Row className="mb-3">
                  <Col md={3}>
                    <BootstrapForm.Label>Mã Tour</BootstrapForm.Label>
                    <Field name="tourCode" className="form-control" placeholder="Nhập mã tour" />
                    <ErrorMessage name="tourCode" component="div" className="text-danger" />
                  </Col>
                  <Col md={3}>
                    <BootstrapForm.Label>Khởi hành</BootstrapForm.Label>
                    <Field name="departure" className="form-control" placeholder="Nơi khởi hành" />
                    <ErrorMessage name="departure" component="div" className="text-danger" />
                  </Col>
                  <Col md={3}>
                    <BootstrapForm.Label>Điểm đến</BootstrapForm.Label>
                    <Field name="destination" className="form-control" placeholder="Điểm đến" />
                    <ErrorMessage name="destination" component="div" className="text-danger" />
                  </Col>
                  <Col md={3}>
                    <BootstrapForm.Label>Giá Tour</BootstrapForm.Label>
                    <Field name="price" className="form-control" placeholder="Giá tiền (vd: 9.990.000)" />
                    <ErrorMessage name="price" component="div" className="text-danger" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <BootstrapForm.Label>Thời gian</BootstrapForm.Label>
                    <Field name="duration" className="form-control" placeholder="Thời gian tour" />
                    <ErrorMessage name="duration" component="div" className="text-danger" />
                  </Col>
                  <Col md={6}>
                    <BootstrapForm.Label>Phương tiện</BootstrapForm.Label>
                    <Field name="transport" className="form-control" placeholder="Phương tiện di chuyển" />
                    <ErrorMessage name="transport" component="div" className="text-danger" />
                  </Col>
                </Row>

                {/* Ngày khởi hành và kết thúc */}
                <Row className="mb-3">
                  <Col md={4}>
                    <BootstrapForm.Label>Ngày khởi hành</BootstrapForm.Label>
                    <Field type="date" name="startDate" className="form-control" />
                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                  </Col>
                  <Col md={4}>
                    <BootstrapForm.Label>Ngày kết thúc</BootstrapForm.Label>
                    <Field type="date" name="endDate" className="form-control" />
                    <ErrorMessage name="endDate" component="div" className="text-danger" />
                  </Col>
                  <Col md={4}>
                    <BootstrapForm.Label>Trạng thái tour</BootstrapForm.Label>
                    <Field as="select" name="availabilityStatus" className="form-select">
                      <option value="Còn chỗ">Còn chỗ</option>
                      <option value="Hết chỗ">Hết chỗ</option>
                    </Field>
                    <ErrorMessage name="availabilityStatus" component="div" className="text-danger" />
                  </Col>
                </Row>

                <hr />

                {/* Ảnh chính */}
                <Row className="mb-4">
                  <Col md={12}>
                    <BootstrapForm.Label>Ảnh Chính</BootstrapForm.Label>
                    <input type="file" accept="image/*" className="form-control" onChange={handleMainImageChange} />
                    {mainImagePreview && (
                      <Image src={mainImagePreview} thumbnail alt="Ảnh chính" className="mt-2" style={{ maxHeight: "200px" }} />
                    )}
                  </Col>
                </Row>

                {/* Ảnh con */}
                <h3>Ảnh Con</h3>
                <FieldArray name="subImageUrls">
                  {({ push, remove }) => (
                    <>
                      {values.subImageUrls.map((_, i) => (
                        <Row key={i} className="align-items-center mb-3">
                          <Col md={10}>
                            {subImagePreviews[i] && (
                              <Image
                                src={subImagePreviews[i]}
                                thumbnail
                                alt={`Ảnh con ${i + 1}`}
                                style={{ maxHeight: "150px" }}
                                className="mb-2"
                              />
                            )}
                            <BootstrapForm.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleSubImageChange(e, i, setFieldValue)}
                            />
                          </Col>
                          <Col md={2}>
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveSubImage(i, values, setFieldValue, remove)}
                              disabled={values.subImageUrls.length === 1}
                            >
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button variant="primary" onClick={() => handleAddSubImage(push)}>
                        Thêm Ảnh Con
                      </Button>
                    </>
                  )}
                </FieldArray>

                <hr />

                {/* Trải nghiệm thú vị */}
                <h3>Trải Nghiệm Thú Vị</h3>
                <FieldArray name="experiences">
                  {({ push, remove }) => (
                    <>
                      {values.experiences.map((_, i) => (
                        <Row key={i} className="align-items-center mb-2">
                          <Col md={10}>
                            <Field name={`experiences[${i}]`} className="form-control" placeholder={`Trải nghiệm thứ ${i + 1}`} />
                            <ErrorMessage name={`experiences[${i}]`} component="div" className="text-danger" />
                          </Col>
                          <Col md={2}>
                            <Button variant="danger" onClick={() => remove(i)} disabled={values.experiences.length === 1}>
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button variant="primary" onClick={() => push("")}>
                        Thêm Trải Nghiệm
                      </Button>
                    </>
                  )}
                </FieldArray>

                <hr />

                {/* Chương trình tour */}
                <h3>Chương Trình Tour</h3>
                <FieldArray name="schedule">
                  {({ push, remove }) => (
                    <>
                      {values.schedule.map((day, i) => (
                        <Row key={i} className="align-items-center mb-2">
                          <Col md={1}>
                            <strong>Ngày {day.dayNumber}</strong>
                          </Col>
                          <Col md={9}>
                            <Field
                              as="textarea"
                              name={`schedule[${i}].description`}
                              className="form-control"
                              placeholder="Mô tả chương trình"
                            />
                            <ErrorMessage name={`schedule[${i}].description`} component="div" className="text-danger" />
                          </Col>
                          <Col md={2}>
                            <Button variant="danger" onClick={() => remove(i)} disabled={values.schedule.length === 1}>
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button variant="primary" onClick={() => push({ dayNumber: values.schedule.length + 1, description: "" })}>
                        Thêm Ngày
                      </Button>
                    </>
                  )}
                </FieldArray>

                <hr />

                {/* Lịch khởi hành & giá tour */}
                <h3>Lịch Khởi Hành & Giá Tour</h3>
                <FieldArray name="departureSchedules">
                  {({ push, remove }) => (
                    <>
                      {values.departureSchedules.map((_, i) => (
                        <Row key={i} className="align-items-center mb-3">
                          <Col md={3}>
                            <BootstrapForm.Label>Ngày khởi hành</BootstrapForm.Label>
                            <Field type="date" name={`departureSchedules[${i}].departureDate`} className="form-control" />
                            <ErrorMessage name={`departureSchedules[${i}].departureDate`} component="div" className="text-danger" />
                          </Col>
                          <Col md={3}>
                            <BootstrapForm.Label>Giá</BootstrapForm.Label>
                            <Field name={`departureSchedules[${i}].price`} className="form-control" placeholder="Ví dụ: 9.990.000 VNĐ" />
                            <ErrorMessage name={`departureSchedules[${i}].price`} component="div" className="text-danger" />
                          </Col>
                          <Col md={3}>
                            <BootstrapForm.Label>Trạng thái</BootstrapForm.Label>
                            <Field name={`departureSchedules[${i}].status`} className="form-control" placeholder="Ví dụ: Lịch Hàng Tuần" />
                            <ErrorMessage name={`departureSchedules[${i}].status`} component="div" className="text-danger" />
                          </Col>
                          <Col md={3} className="d-flex align-items-end">
                            <Button variant="danger" onClick={() => remove(i)} disabled={values.departureSchedules.length === 1}>
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button variant="primary" onClick={() => push({ departureDate: "", price: "", status: "" })}>
                        Thêm Lịch Khởi Hành
                      </Button>
                    </>
                  )}
                </FieldArray>

                <hr />

                {/* Thông tin cần lưu ý */}
                <h3>Thông Tin Cần Lưu Ý</h3>
                <FieldArray name="notes">
                  {({ push, remove }) => (
                    <>
                      {values.notes.map((_, i) => (
                        <Row key={i} className="align-items-center mb-2">
                          <Col md={10}>
                            <Field name={`notes[${i}]`} className="form-control" placeholder="Nhập thông tin lưu ý" />
                            <ErrorMessage name={`notes[${i}]`} component="div" className="text-danger" />
                          </Col>
                          <Col md={2}>
                            <Button variant="danger" onClick={() => remove(i)} disabled={values.notes.length === 1}>
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button variant="primary" onClick={() => push("")}>
                        Thêm Lưu Ý
                      </Button>
                    </>
                  )}
                </FieldArray>

                <hr />

                <div className="d-flex justify-content-start mt-3">
                  <Button variant="success me-2" type="submit" disabled={isSubmitting}>
                    Cập nhật Tour
                  </Button>
                  <Button variant="secondary" onClick={() => navigate("/admin/tours")}>
                    Quay lại
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditTour;
