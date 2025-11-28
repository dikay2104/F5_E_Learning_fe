import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Divider,
  Spin,
  Empty,
  Carousel,
  Button,
  Input,
  Select,
  Pagination,
} from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React from "react";
import { getAllCourses } from "../../services/courseService";
import CourseCardStudent from "../../components/CourseCardStudent";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const slides = [
  {
    title: "Học làm cha mẹ từ con số 0",
    desc: "Khoá học chất lượng, video ngắn mỗi ngày, đồng hành cùng chuyên gia nuôi dạy trẻ. Học nhanh – áp dụng ngay vào cuộc sống.",
    img: "https://res.cloudinary.com/djaolkvze/image/upload/v1763817979/1_ta2xk4.jpg",
  },
  {
    title: "Cộng đồng phụ huynh hỗ trợ 24/7",
    desc: "Tham gia nhóm trao đổi, đặt câu hỏi, chia sẻ kinh nghiệm nuôi dạy con cùng hàng nghìn phụ huynh khác.",
    img: "https://res.cloudinary.com/djaolkvze/image/upload/v1763817980/2_d3rp8d.jpg",
  },
  {
    title: "Nâng cấp kỹ năng làm cha mẹ",
    desc: "Những khóa học chuyên sâu, cập nhật kiến thức mới về tâm lý trẻ, sức khỏe, kỹ năng giao tiếp gia đình — được hướng dẫn bởi chuyên gia thực hành.",
    img: "https://res.cloudinary.com/djaolkvze/image/upload/v1763817982/3_v7sqok.jpg",
  },
];

export default function GuestHome() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const carouselRef = useRef();
  const navigate = useNavigate();

  const [freePage, setFreePage] = useState(1);
  const [vipPage, setVipPage] = useState(1);

  // Mỗi trang hiển thị 6 khóa học
  const PAGE_SIZE = 6;

  useEffect(() => {
    getAllCourses()
      .then((res) => {
        const approvedCourses = (res.data.data || res.data).filter(
          (course) => course.status === "approved"
        );
        setCourses(approvedCourses);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses
    .filter((course) => {
      const keyword = searchValue.trim().toLowerCase();
      if (!keyword) return true;
      return (
        course.title?.toLowerCase().includes(keyword) ||
        course.description?.toLowerCase().includes(keyword)
      );
    })
    .filter((course) => {
      if (priceFilter === "all") return true;
      if (priceFilter === "0-80k")
        return course.price >= 0 && course.price <= 80000;
      if (priceFilter === "80-150k")
        return course.price > 80000 && course.price <= 150000;
      if (priceFilter === "150k+") return course.price > 150000;
      return true;
    })
    .filter((course) => {
      if (categoryFilter === "all") return true;
      return course.category === categoryFilter;
    });

  const freeCourses = filteredCourses.filter((c) => c.price === 0);
  const vipCourses = filteredCourses.filter((c) => c.price > 0);

  // Chia trang Free Courses
  const paginatedFreeCourses = freeCourses.slice(
    (freePage - 1) * PAGE_SIZE,
    freePage * PAGE_SIZE
  );

  // Chia trang VIP Courses
  const paginatedVipCourses = vipCourses.slice(
    (vipPage - 1) * PAGE_SIZE,
    vipPage * PAGE_SIZE
  );

  // Reset pagination khi filter/search thay đổi
  useEffect(() => {
    setFreePage(1);
    setVipPage(1);
  }, [searchValue, priceFilter, categoryFilter]);


  // Custom responsive grid
  const renderCourseGrid = (courseList) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, 320px)",
        gap: "32px",
        justifyContent: "center",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {courseList.map((course) => (
        <CourseCardStudent
          key={course._id}
          course={course}
          onView={() => navigate("/login")}
        />
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 16px" }}>
      {/* Slide bar section */}
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          padding: "32px 0",
          position: "relative",
        }}
      >
        {/* Custom Arrow Buttons */}
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: -18,
            zIndex: 10,
            transform: "translateY(-50%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            background: "#fff",
            border: "1.5px solid #e0e0e0",
            borderRadius: 20,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => carouselRef.current.prev()}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            right: -24,
            zIndex: 2,
            transform: "translateY(-50%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
          onClick={() => carouselRef.current.next()}
        />
        <Carousel
          ref={carouselRef}
          autoplay
          dots
          style={{ margin: "0 auto", maxWidth: 1100, width: "100%" }}
        >
          {slides.map((slide, idx) => (
            <div key={idx}>
              <div
                style={{
                  position: "relative",
                  background: "#f5f7fa",
                  borderRadius: 20,
                  minHeight: 340,
                  overflow: "hidden",
                  padding: 0,
                  maxWidth: 1100,
                  width: "100%",
                  margin: "0 auto",
                  border: "1.5px solid #e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  style={{
                    width: "100%",
                    height: 340,
                    objectFit: "cover",
                    borderRadius: 20,
                    display: "block",
                  }}
                />
                {/* Caption overlay */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0) 100%)",
                    color: "#fff",
                    padding: "20px 32px 18px 32px",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    boxSizing: "border-box",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div
                    style={{ fontSize: 22, fontWeight: 600, marginBottom: 2 }}
                  >
                    {slide.title}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 400 }}>
                    {slide.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* Search bar và Sort dưới carousel */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 32,
          gap: 16,
        }}
      >
        <Input.Search
          placeholder="Tìm kiếm khoá học..."
          allowClear
          enterButton
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={(v) => setSearchValue(v)}
          style={{ maxWidth: 400 }}
        />
        <Select
          defaultValue="all"
          style={{ width: 180 }}
          onChange={(value) => setPriceFilter(value)}
        >
          <Select.Option value="all">Tất cả mức giá</Select.Option>
          <Select.Option value="0-80k">0 - 80.000đ</Select.Option>
          <Select.Option value="80-150k">80.000đ - 150.000đ</Select.Option>
          <Select.Option value="150k+">Trên 150.000đ</Select.Option>
        </Select>
        <Select
          defaultValue="all"
          style={{ width: 220 }}
          onChange={(value) => setCategoryFilter(value)}
        >
          <Select.Option value="all">Tất cả danh mục</Select.Option>
          <Select.Option value="child_psychology">Tâm lý trẻ em</Select.Option>
          <Select.Option value="parenting_skills">
            Kỹ năng làm cha mẹ
          </Select.Option>
          <Select.Option value="child_health_nutrition">
            Sức khỏe & dinh dưỡng trẻ em
          </Select.Option>
          <Select.Option value="kids_technology">
            Công nghệ & trẻ nhỏ
          </Select.Option>
          <Select.Option value="early_education_skills">
            Giáo dục sớm & phát triển kỹ năng
          </Select.Option>
          <Select.Option value="parent_mental_balance">
            Cân bằng tâm lý cho cha mẹ
          </Select.Option>
        </Select>
      </div>

      {/* Khóa học miễn phí */}
      <div style={{ marginBottom: 48 }}>
        <Divider
          orientation="left"
          orientationMargin={0}
          style={{ fontWeight: 600, fontSize: 18 }}
        >
          Khóa học miễn phí
        </Divider>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
          </div>
        ) : freeCourses.length === 0 ? (
          <Empty
            description="Chưa có khóa học miễn phí"
            style={{ margin: "32px 0" }}
          />
        ) : (
          <>
            {renderCourseGrid(paginatedFreeCourses)}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Pagination
                current={freePage}
                total={freeCourses.length}
                pageSize={PAGE_SIZE}
                onChange={(page) => setFreePage(page)}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>

      {/* Khóa học VIP */}
      <div style={{ marginBottom: 48 }}>
        <Divider
          orientation="left"
          orientationMargin={0}
          style={{ fontWeight: 600, fontSize: 18 }}
        >
          Khóa học trả phí
        </Divider>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
          </div>
        ) : vipCourses.length === 0 ? (
          <Empty
            description="Chưa có khóa học VIP/Pro"
            style={{ margin: "32px 0" }}
          />
        ) : (
          <>
            {renderCourseGrid(paginatedVipCourses)}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <Pagination
                current={vipPage}
                total={vipCourses.length}
                pageSize={PAGE_SIZE}
                onChange={(page) => setVipPage(page)}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
