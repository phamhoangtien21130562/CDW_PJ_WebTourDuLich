import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";


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
  categoryId: string;
}

const AddTourForm: React.FC = () => {
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const navigate = useNavigate();
  const [subImageFiles, setSubImageFiles] = useState<File[]>([]);
  const [subImagePreviews, setSubImagePreviews] = useState<string[]>([""]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);  // Khởi tạo mảng rỗng
  const [firstCategory, setFirstCategory] = useState<{ id: string; name: string } | null>(null); // State để lưu danh mục 
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
         if (response.data && response.data.length > 0) {
          setFirstCategory(response.data[0]); // Lưu danh mục đầu tiên
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

 const validationSchema = Yup.object({
    title: Yup.string().required("Tiêu đề tour là bắt buộc"),
    tourCode: Yup.string().required("Mã tour là bắt buộc"),
    departure: Yup.string().required("Khởi hành là bắt buộc"),
    destination: Yup.string().required("Điểm đến là bắt buộc"),
    duration: Yup.string().required("Thời gian là bắt buộc"),
    transport: Yup.string().required("Phương tiện là bắt buộc"),
    price: Yup.string().required("Giá tour là bắt buộc"),
    startDate: Yup.string().required("Ngày khởi hành là bắt buộc"),
    endDate: Yup.string().required("Ngày kết thúc là bắt buộc")
      .test('endDate', 'Ngày kết thúc phải lớn hơn ngày khởi hành', function (value) {
        const { startDate } = this.parent;
        return new Date(value).getTime() > new Date(startDate).getTime();
      }),
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
    // categoryId: Yup.string().required("Danh mục là bắt buộc"),
  });

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const days = timeDifference / (1000 * 3600 * 24); // Số ngày
    return `${days} ngày ${days - 1} đêm`;
  };
   const initialValues: TourValues = {
    title: "",
    tourCode: "",
    departure: "",
    destination: "",
    duration: "",
    transport: "",
    price: "",
    startDate: "",
    endDate: "",
    deleted: false,
    availabilityStatus: "Còn chỗ",
    experiences: [""],
    schedule: [{ dayNumber: 1, description: "" }],
    departureSchedules: [{ departureDate: "", price: "", status: "" }],
    notes: [""],
    subImageUrls: [""],
    categoryId: "", // Khởi tạo giá trị mặc định cho categoryId
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });


  const  handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setSubImageFiles([...subImageFiles, null as any]);
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
          <h2 className="mb-4">Thêm Tour Mới</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                if (!mainImageFile) {
                  toast.error("Vui lòng chọn ảnh chính!");
                  setSubmitting(false);
                  return;
                }

                const formData = new FormData();
                formData.append(
                  "tour",
                  new Blob([JSON.stringify(values)], { type: "application/json" })
                );

                formData.append("mainImage", mainImageFile);

                subImageFiles.forEach((file) => {
                  if (file) formData.append("subImages", file);
                });

                await axios.post("http://localhost:8080/api/tours", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                });

                toast.success("Thêm tour thành công!");
                resetForm();
                setMainImageFile(null);
                setMainImagePreview("");
                setSubImageFiles([]);
                setSubImagePreviews([""]);
              } catch (error) {
                console.error(error);
                toast.error("Lỗi khi thêm tour!");
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
                    <Field
                      name="title"
                      className="form-control"
                      placeholder="Nhập tiêu đề tour"
                    />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                  </Col>
                </Row>

                {/* Thông tin chung */}
                <Row className="mb-3">
                  <Col md={3}>
                    <BootstrapForm.Label>Mã Tour</BootstrapForm.Label>
                    <Field
                      name="tourCode"
                      className="form-control"
                      placeholder="Nhập mã tour"
                    />
                    <ErrorMessage
                      name="tourCode"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3}>
                    <BootstrapForm.Label>Khởi hành</BootstrapForm.Label>
                    <Field
                      name="departure"
                      className="form-control"
                      placeholder="Nơi khởi hành"
                    />
                    <ErrorMessage
                      name="departure"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3}>
                    <BootstrapForm.Label>Điểm đến</BootstrapForm.Label>
                    <Field
                      name="destination"
                      className="form-control"
                      placeholder="Điểm đến"
                    />
                    <ErrorMessage
                      name="destination"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={3}>
                    <BootstrapForm.Label>Giá Tour</BootstrapForm.Label>
                    <Field
                      name="price"
                      className="form-control"
                      placeholder="Giá tiền (vd: 9.990.000)"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                   <BootstrapForm.Label>Thời gian</BootstrapForm.Label>
                <Field
      name="duration"
      className="form-control"
      value={values.duration}
      readOnly
      disabled={!values.startDate && !values.endDate} // Disable trường duration nếu chưa chọn ngày khởi hành hoặc ngày kết thúc
    />
              
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                  <Col md={6}>
                    <BootstrapForm.Label>Phương tiện</BootstrapForm.Label>
                    <Field
                      name="transport"
                      className="form-control"
                      placeholder="Phương tiện di chuyển"
                    />
                    <ErrorMessage
                      name="transport"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>

                {/* Ngày khởi hành và kết thúc */}
                <Row className="mb-3">
               <Col md={4}>
                    <BootstrapForm.Label>Ngày khởi hành</BootstrapForm.Label>
                    <Field
                      type="date"
                      name="startDate"
                      className="form-control"
                      onChange={(e) => {
                        setFieldValue("startDate", e.target.value);
                        setFieldValue("duration", calculateDuration(e.target.value, values.endDate));
                      }}
                    />
                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                  </Col>
                 <Col md={4}>
                    <BootstrapForm.Label>Ngày kết thúc</BootstrapForm.Label>
                    <Field
                      type="date"
                      name="endDate"
                      className="form-control"
                      onChange={(e) => {
                        setFieldValue("endDate", e.target.value);
                        setFieldValue("duration", calculateDuration(values.startDate, e.target.value));
                      }}
                    />
                    <ErrorMessage name="endDate" component="div" className="text-danger" />
                  </Col>
                  <Col md={4}>
                    <BootstrapForm.Label>Trạng thái tour</BootstrapForm.Label>
                    <Field
                      as="select"
                      name="availabilityStatus"
                      className="form-select"
                    >
                      <option value="Còn chỗ">Còn chỗ</option>
                      <option value="Hết chỗ">Hết chỗ</option>
                    </Field>
                    <ErrorMessage
                      name="availabilityStatus"
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>

                <hr />

                {/* Ảnh chính */}
                <Row className="mb-4">
                  <Col md={12}>
                    <BootstrapForm.Label>Ảnh Chính</BootstrapForm.Label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handleMainImageChange}
                    />
                    {mainImagePreview && (
                      <Image
                        src={mainImagePreview}
                        thumbnail
                        alt="Ảnh chính"
                        className="mt-2"
                        style={{ maxHeight: "200px" }}
                      />
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
                              onChange={(e) =>
                                handleSubImageChange(e, i, setFieldValue)
                              }
                            />
                          </Col>
                          <Col md={2}>
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleRemoveSubImage(i, values, setFieldValue, remove)
                              }
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
                            <Field
                              name={`experiences[${i}]`}
                              className="form-control"
                              placeholder={`Trải nghiệm thứ ${i + 1}`}
                            />
                            <ErrorMessage
                              name={`experiences[${i}]`}
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col md={2}>
                            <Button
                              variant="danger"
                              onClick={() => remove(i)}
                              disabled={values.experiences.length === 1}
                            >
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
                            <ErrorMessage
                              name={`schedule[${i}].description`}
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col md={2}>
                            <Button
                              variant="danger"
                              onClick={() => remove(i)}
                              disabled={values.schedule.length === 1}
                            >
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button
                        variant="primary"
                        onClick={() =>
                          push({ dayNumber: values.schedule.length + 1, description: "" })
                        }
                      >
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
                            <Field
                              type="date"
                              name={`departureSchedules[${i}].departureDate`}
                              className="form-control"
                            />
                            <ErrorMessage
                              name={`departureSchedules[${i}].departureDate`}
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col md={3}>
                            <BootstrapForm.Label>Giá</BootstrapForm.Label>
                            <Field
                              name={`departureSchedules[${i}].price`}
                              className="form-control"
                              placeholder="Ví dụ: 9.990.000 VNĐ"
                            />
                            <ErrorMessage
                              name={`departureSchedules[${i}].price`}
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col md={3}>
                            <BootstrapForm.Label>Trạng thái</BootstrapForm.Label>
                            <Field
                              name={`departureSchedules[${i}].status`}
                              className="form-control"
                              placeholder="Ví dụ: Lịch Hàng Tuần"
                            />
                            <ErrorMessage
                              name={`departureSchedules[${i}].status`}
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col md={3} className="d-flex align-items-end">
                            <Button
                              variant="danger"
                              onClick={() => remove(i)}
                              disabled={values.departureSchedules.length === 1}
                            >
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button
                        variant="primary"
                        onClick={() => push({ departureDate: "", price: "", status: "" })}
                      >
                        Thêm Lịch Khởi Hành
                      </Button>
                    </>
                  )}
                </FieldArray>

                <hr />

                  <Row className="mb-3">
                  <Col md={12}>
                    <BootstrapForm.Label>Danh mục</BootstrapForm.Label>
                    <Field
                      as="select"
                      name="categoryId"
                      className="form-control"
                      value={values.categoryId}
                      onChange={(e: any) => setFieldValue("categoryId", e.target.value)}
                    >
                      <option value="">Chọn danh mục</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="categoryId" component="div" className="text-danger" />
                  </Col>
                </Row>
   <hr />
                {/* Thông tin cần lưu ý */}
                <h3>Thông Tin Cần Lưu Ý</h3>
                <FieldArray name="notes">
                  {({ push, remove }) => (
                    <>
                      {values.notes.map((_, i) => (
                        <Row key={i} className="align-items-center mb-2">
                          <Col md={10}>
                            <Field
                              name={`notes[${i}]`}
                              className="form-control"
                              placeholder="Nhập thông tin lưu ý"
                            />
                            <ErrorMessage
                              name={`notes[${i}]`}
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                          <Col md={2}>
                            <Button
                              variant="danger"
                              onClick={() => remove(i)}
                              disabled={values.notes.length === 1}
                            >
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
                    Lưu Tour
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

export default AddTourForm;
