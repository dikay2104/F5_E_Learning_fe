import { Card, Avatar, Tag, Button, Space, Typography } from 'antd';
import { UserOutlined, ClockCircleOutlined, DollarOutlined, BookOutlined } from '@ant-design/icons';
import thumbnailFallback from '../assets/thumbnail.jpg';
import { useState } from 'react';
import { Modal } from 'antd';

const { Meta } = Card;
const { Text, Title } = Typography;

// Category mapping
const categoryMap = {
  child_psychology: 'Tâm lý trẻ em',
  parenting_skills: 'Kỹ năng làm cha mẹ',
  child_health_nutrition: 'Sức khỏe & dinh dưỡng trẻ em',
  kids_technology: 'Công nghệ & trẻ nhỏ',
  early_education_skills: 'Giáo dục sớm & phát triển kỹ năng',
  parent_mental_balance: 'Cân bằng tâm lý cho cha mẹ',
};

const categoryColor = {
  child_psychology: 'magenta',
  parenting_skills: 'blue',
  child_health_nutrition: 'green',
  kids_technology: 'cyan',
  early_education_skills: 'purple',
  parent_mental_balance: 'orange',
};

export default function CourseCardStudent({ course, onView, isEnrolled, onJoin, onPay }) {
  const {
    title, description, price, thumbnail, category, duration, studentsCount, teacher,
  } = course;

  return (
    <Card
      hoverable
      cover={
        <img
          alt="course-thumbnail"
          src={thumbnail || thumbnailFallback}
          style={{
            width: '100%',
            height: 200,
            objectFit: 'cover',
            display: 'block',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12
          }}
        />
      }
      onClick={onView}
      style={{
        minWidth: 260,
        maxWidth: 340,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      bodyStyle={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
      }}
    >
      <Meta
        avatar={<Avatar icon={<UserOutlined />} src={teacher?.avatar} />}
        title={<Title level={4} style={{ margin: 0 }}>{title}</Title>}
        description={<Text type="secondary">{description?.slice(0, 100)}...</Text>}
      />

      <Space direction="vertical" size="small" style={{ marginTop: 16 }}>
        {/* Category only */}
        <Space>
          <Tag color={categoryColor[category]}>
            {categoryMap[category] || category}
          </Tag>
        </Space>

        <Space>
          <ClockCircleOutlined />
          <Text>
            {duration >= 3600
              ? `${Math.floor(duration / 3600)} giờ ${Math.floor((duration % 3600) / 60)} phút`
              : `${Math.floor(duration / 60)} phút`}
          </Text>
        </Space>

        <Space>
          <BookOutlined />
          <Text>{studentsCount} học viên</Text>
        </Space>

        <Space>
          <DollarOutlined />
          <Text>
            {typeof price === 'number'
              ? price === 0
                ? 'Miễn phí'
                : `${price.toLocaleString()}đ`
              : '---'}
          </Text>
        </Space>
      </Space>
    </Card>
  );
}
