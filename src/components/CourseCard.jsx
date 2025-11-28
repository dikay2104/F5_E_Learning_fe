import { Card, Avatar, Tag, Button, Space, Typography } from 'antd';
import {
  UserOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  BookOutlined,
} from '@ant-design/icons';
import thumbnailFallback from '../assets/thumbnail.jpg';

const { Meta } = Card;
const { Text, Title } = Typography;

const statusColor = {
  approved: 'green',
  pending: 'orange',
  rejected: 'red',
  draft: 'default',
};

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


export default function CourseCard({ course, role = 'student', onClick, onEdit, onDelete, onSubmit }) {
  const {
    title,
    description,
    price,
    thumbnail,
    category,
    duration,
    studentsCount,
    status,
    teacher,
  } = course;

  const actions =
    role === 'teacher'
      ? [
          <Button type="link" onClick={(e) => { e.stopPropagation(); onEdit(); }}>Chỉnh sửa</Button>,
          <Button type="link" danger onClick={(e) => { e.stopPropagation(); onDelete(); }}>Xoá</Button>,
          status === 'draft' && (
            <Button type="link" onClick={(e) => { e.stopPropagation(); onSubmit(); }}>
              Gửi duyệt
            </Button>
          ),
        ].filter(Boolean)
      : [<Button type="primary">Xem khoá học</Button>];

  return (
    <Card
      hoverable
      onClick={onClick}
      cover={
        <img
          alt="course-thumbnail"
          src={thumbnail || thumbnailFallback}
          style={{ height: 200, objectFit: 'cover' }}
        />
      }
      actions={actions}
    >
      <Meta
        avatar={<Avatar icon={<UserOutlined />} src={teacher?.avatar} />}
        title={<Title level={4} style={{ margin: 0 }}>{title}</Title>}
        description={
          <Text
            type="secondary"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "48px",
              lineHeight: "1.5em",
              maxHeight: "3em",
            }}
          >
            {description?.slice(0, 100)}
          </Text>
        }
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
            {price == null
              ? 'Chưa có giá'
              : price === 0
                ? 'Miễn phí'
                : `${price.toLocaleString()}đ`}
          </Text>
        </Space>

        {role === 'teacher' && (
          <Space>
            <Text strong>Trạng thái:</Text>
            <Tag color={statusColor[status]}>{status.toUpperCase()}</Tag>
          </Space>
        )}
      </Space>
    </Card>
  );
}
