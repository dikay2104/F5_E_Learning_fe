import { useEffect, useState } from 'react';
import { Typography, Divider, Row, Col, Spin, Empty } from 'antd';
import { getAllCourses } from '../../services/courseService';
import CourseCard from '../../components/CourseCard';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function RoadmapFE() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses()
      .then(res => setCourses(res.data.data || res.data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  // Lọc các khóa học theo từng mục chuyên đề
  const childPsychology = courses.filter(c => c.category === "child_psychology").slice(0, 3);
  const parentingSkills = courses.filter(c => c.category === "parenting_skills").slice(0, 3);
  const childHealth = courses.filter(c => c.category === "child_health_nutrition").slice(0, 3);
  const kidsTechnology = courses.filter(c => c.category === "kids_technology").slice(0, 3);
  const earlyEducation = courses.filter(c => c.category === "early_education_skills").slice(0, 3);
  const parentMental = courses.filter(c => c.category === "parent_mental_balance").slice(0, 3);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 16px' }}>
      <Title level={1} style={{ color: '#1677ff', marginBottom: 12 }}>Chuyên mục kiến thức nuôi dạy trẻ</Title>
      <Paragraph style={{ fontSize: 18, marginBottom: 24 }}>
        Chuyên mục tập hợp các khóa học giúp bố mẹ hiểu con sâu sắc hơn và xây dựng sự kết nối tích cực trong gia đình. Mỗi chủ đề đều xoay quanh hành trình trưởng thành của trẻ — từ cảm xúc, kỹ năng, sức khỏe đến thói quen sống lành mạnh.
      </Paragraph>

      <Divider orientation="left" orientationMargin={0} style={{ fontWeight: 600 }}>
        <span style={{ fontSize: 20 }}>1. TÂM LÝ TRẺ EM</span>
      </Divider>
      <Paragraph>Giúp cha mẹ hiểu cảm xúc, hành vi và sự phát triển tâm lý của trẻ ở từng giai đoạn.</Paragraph>
      {loading ? <Spin size="large" style={{ display: 'block', margin: '40px auto' }} /> :
        childPsychology.length === 0 ? <Empty description="Chưa có khóa học tâm lý trẻ em" style={{ margin: '32px 0' }} /> :
        <Row gutter={[24, 24]}>
          {childPsychology.map(course => (
            <Col xs={24} sm={12} md={8} key={course._id}>
              <CourseCard course={course} role="guest" onClick={() => navigate(`/courses/${course._id}`)} />
            </Col>
          ))}
        </Row>
      }

      <Divider orientation="left" orientationMargin={0} style={{ fontWeight: 600, marginTop: 40 }}>
        <span style={{ fontSize: 20 }}>2. KỸ NĂNG LÀM CHA MẸ</span>
      </Divider>
      <Paragraph>Cung cấp công cụ giao tiếp và tương tác tích cực giữa cha mẹ và con.</Paragraph>
      {loading ? <Spin size="large" style={{ display: 'block', margin: '40px auto' }} /> :
        parentingSkills.length === 0 ? <Empty description="Chưa có khóa học kỹ năng làm cha mẹ" style={{ margin: '32px 0' }} /> :
        <Row gutter={[24, 24]}>
          {parentingSkills.map(course => (
            <Col xs={24} sm={12} md={8} key={course._id}>
              <CourseCard course={course} role="guest" onClick={() => navigate(`/courses/${course._id}`)} />
            </Col>
          ))}
        </Row>
      }

      <Divider orientation="left" orientationMargin={0} style={{ fontWeight: 600, marginTop: 40 }}>
        <span style={{ fontSize: 20 }}>3.  SỨC KHỎE & DINH DƯỠNG TRẺ EM</span>
      </Divider>
      <Paragraph>Hướng dẫn cha mẹ về thói quen ăn uống, giấc ngủ, và chăm sóc thể chất.</Paragraph>
      {loading ? <Spin size="large" style={{ display: 'block', margin: '40px auto' }} /> :
        childHealth.length === 0 ? <Empty description="Chưa có khóa học sức khỏe & dinh dưỡng trẻ em" style={{ margin: '32px 0' }} /> :
        <Row gutter={[24, 24]}>
          {childHealth.map(course => (
            <Col xs={24} sm={12} md={8} key={course._id}>
              <CourseCard course={course} role="guest" onClick={() => navigate(`/courses/${course._id}`)} />
            </Col>
          ))}
        </Row>
      }

      <Divider orientation="left" orientationMargin={0} style={{ fontWeight: 600, marginTop: 40 }}>
        <span style={{ fontSize: 20 }}>4.  CÔNG NGHỆ & TRẺ NHỎ</span>
      </Divider>
      <Paragraph>Giúp cha mẹ định hướng sử dụng công nghệ an toàn, thông minh.</Paragraph>
      {loading ? <Spin size="large" style={{ display: 'block', margin: '40px auto' }} /> :
        kidsTechnology.length === 0 ? <Empty description="Chưa có khóa học công nghệ & trẻ nhỏ" style={{ margin: '32px 0' }} /> :
        <Row gutter={[24, 24]}>
          {kidsTechnology.map(course => (
            <Col xs={24} sm={12} md={8} key={course._id}>
              <CourseCard course={course} role="guest" onClick={() => navigate(`/courses/${course._id}`)} />
            </Col>
          ))}
        </Row>
      }

      <Divider orientation="left" orientationMargin={0} style={{ fontWeight: 600, marginTop: 40 }}>
        <span style={{ fontSize: 20 }}>5. GIÁO DỤC SỚM & PHÁT TRIỂN KỸ NĂNG</span>
      </Divider>
      <Paragraph>Hướng dẫn cha mẹ kích thích phát triển nhận thức, ngôn ngữ, sáng tạo.</Paragraph>
      {loading ? <Spin size="large" style={{ display: 'block', margin: '40px auto' }} /> :
        earlyEducation.length === 0 ? <Empty description="Chưa có khóa học giáo dục sớm & phát triển kỹ năng" style={{ margin: '32px 0' }} /> :
        <Row gutter={[24, 24]}>
          {earlyEducation.map(course => (
            <Col xs={24} sm={12} md={8} key={course._id}>
              <CourseCard course={course} role="guest" onClick={() => navigate(`/courses/${course._id}`)} />
            </Col>
          ))}
        </Row>
      }

      <Divider orientation="left" orientationMargin={0} style={{ fontWeight: 600, marginTop: 40 }}>
        <span style={{ fontSize: 20 }}>6. CÂN BẰNG TÂM LÝ CHO CHA MẸ</span>
      </Divider>
      <Paragraph>Vì muốn con hạnh phúc, cha mẹ trước hết cần hạnh phúc.</Paragraph>
      {loading ? <Spin size="large" style={{ display: 'block', margin: '40px auto' }} /> :
        parentMental.length === 0 ? <Empty description="Chưa có khóa học cân bằng tâm lý cho cha mẹ" style={{ margin: '32px 0' }} /> :
        <Row gutter={[24, 24]}>
          {parentMental.map(course => (
            <Col xs={24} sm={12} md={8} key={course._id}>
              <CourseCard course={course} role="guest" onClick={() => navigate(`/courses/${course._id}`)} />
            </Col>
          ))}
        </Row>
      }
    </div>
  );
} 