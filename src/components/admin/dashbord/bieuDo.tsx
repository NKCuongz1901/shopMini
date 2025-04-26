import { Row, Col, Card } from 'antd';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import CountUp from 'react-countup';
import { FC } from 'react';

const BieuDo: FC = () => {
  const formatter = (value: number | string) => {
    return <CountUp end={Number(value)} separator="," />;
  };

  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 15000 },
    { month: "Mar", sales: 8000 },
    { month: "Apr", sales: 14000 },
    { month: "May", sales: 10000 },
    { month: "Jun", sales: 16000 },
    { month: "Jul", sales: 20000 },
    { month: "Aug", sales: 18000 },
    { month: "Sep", sales: 17000 },
    { month: "Oct", sales: 19000 },
    { month: "Nov", sales: 21000 },
    { month: "Dec", sales: 22000 },
  ];

  const trafficData = [
    { name: "Desktop", value: 63 },
    { name: "Tablet", value: 15 },
    { name: "Phone", value: 22 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <Row gutter={[20, 20]}>
      <Col span={24} md={16}>
        <Card title="Sales" bordered={false}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => Number(value).toLocaleString()} />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>

      <Col span={24} md={8}>
        <Card title="Traffic Source" bordered={false}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default BieuDo;
