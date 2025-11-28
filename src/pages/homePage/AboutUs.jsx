import { Typography, Card, Row, Col, Carousel, Button, Divider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';

const { Title, Paragraph, Text } = Typography;

const slides = [
  {
    title: 'Học làm cha mẹ từ con số 0',
    desc: 'Khoá học chất lượng, video ngắn mỗi ngày, đồng hành cùng chuyên gia nuôi dạy trẻ. Học nhanh – áp dụng ngay vào cuộc sống.',
    img: 'https://res.cloudinary.com/djaolkvze/image/upload/v1763817979/1_ta2xk4.jpg',
  },
  {
    title: 'Cộng đồng phụ huynh hỗ trợ 24/7',
    desc: 'Tham gia nhóm trao đổi, đặt câu hỏi, chia sẻ kinh nghiệm nuôi dạy con cùng hàng nghìn phụ huynh khác.',
    img: 'https://res.cloudinary.com/djaolkvze/image/upload/v1763817980/2_d3rp8d.jpg',
  },
  {
    title: 'Nâng cấp kỹ năng làm cha mẹ',
    desc: 'Những khóa học chuyên sâu, cập nhật kiến thức mới về tâm lý trẻ, sức khỏe, kỹ năng giao tiếp gia đình — được hướng dẫn bởi chuyên gia thực hành.',
    img: 'https://res.cloudinary.com/djaolkvze/image/upload/v1763817982/3_v7sqok.jpg',
  },
];

const news = [
  {
    title: 'Phỏng vấn phụ huynh có con 3–6 tuổi',
    content: '“Học trên Learning for Parents chỉ 5 phút mỗi ngày mà mình hiểu tâm lý con rõ hơn hẳn. Bé nhà mình bớt mè nheo và biết nói cảm xúc sau 2 tuần.” – Trang, mẹ bé 4 tuổi.',
    img: 'https://res.cloudinary.com/djaolkvze/image/upload/v1763817980/4_rn6fwc.jpg',
  },
  {
    title: 'Phỏng vấn phụ huynh bận rộn',
    content: '“Video ngắn nhưng rất thực tế. Nhờ khóa ‘Giao tiếp tích cực’, con mình hợp tác hơn và gia đình ít căng thẳng hơn thấy rõ.” – Hoàng, bố bé 7 tuổi.',
    img: 'https://res.cloudinary.com/djaolkvze/image/upload/v1763817980/5_gutdtv.jpg',
  },
  {
    title: 'Learning for Parents – Nền tảng học thông minh dành cho cha mẹ',
    content: 'Nền tảng cung cấp các bài học 3–5 phút giúp phụ huynh hiểu con, dạy con dễ hơn và xây dựng gia đình hạnh phúc mỗi ngày.',
    img: 'https://res.cloudinary.com/djaolkvze/image/upload/v1763817979/6_vpwykr.jpg',
  },
];

export default function AboutUs() {
  const carouselRef = useRef();

  return (
    <div style={{ maxWidth: 1100, margin: '40px auto', padding: '24px' }}>
      {/* Slide bar section (copied from guest/home) */}
      <div style={{ maxWidth: 1100, margin: '0 auto 40px auto', position: 'relative' }}>
        {/* Custom Arrow Buttons */}
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          size="large"
          style={{ position: 'absolute', top: '50%', left: -24, zIndex: 2, transform: 'translateY(-50%)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          onClick={() => carouselRef.current.prev()}
        />
        <Button
          shape="circle"
          icon={<RightOutlined />}
          size="large"
          style={{ position: 'absolute', top: '50%', right: -24, zIndex: 2, transform: 'translateY(-50%)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          onClick={() => carouselRef.current.next()}
        />
        <Carousel
          ref={carouselRef}
          autoplay
          dots
          style={{ margin: '0 auto', maxWidth: 1100, width: '100%' }}
        >
          {slides.map((slide, idx) => (
            <div key={idx}>
              <div style={{
                position: 'relative',
                background: '#f5f7fa',
                borderRadius: 20,
                minHeight: 340,
                overflow: 'hidden',
                padding: 0,
                maxWidth: 1100,
                width: '100%',
                margin: '0 auto',
                border: '1.5px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img 
                  src={slide.img} 
                  alt={slide.title} 
                  style={{ 
                    width: '100%', 
                    height: 340, 
                    objectFit: 'cover', 
                    borderRadius: 20, 
                    display: 'block',
                  }} 
                />
                {/* Caption overlay */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0) 100%)',
                  color: '#fff',
                  padding: '20px 32px 18px 32px',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  boxSizing: 'border-box',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}>
                  <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 2 }}>{slide.title}</div>
                  <div style={{ fontSize: 16, fontWeight: 400 }}>{slide.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>


      {/* 3. News Section */}
      <div>
      <Divider orientation="left" orientationMargin={0} style={{ fontWeight: 600, fontSize: 18 }}>
          Thông tin mới nhất
        </Divider><Row gutter={[32, 32]} justify="center">
          {news.map((item, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <Card
                hoverable
                cover={<img src={item.img} alt={item.title} style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />}
                style={{ borderRadius: 12, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16 }}
              >
                <Title level={4} style={{ color: '#1677ff', minHeight: 48 }}>{item.title}</Title>
                <Paragraph style={{ fontSize: 15, color: '#444', flex: 1 }}>{item.content}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
} 