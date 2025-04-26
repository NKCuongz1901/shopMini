import { Card, Col, Row, Statistic } from "antd";
import CountUp from 'react-countup';
import BieuDo from "@/components/admin/dashbord/bieuDo";

const DashboardPage = () => {
    const formatter = (value: number | string) => {
        return (
            <CountUp end={Number(value)} separator="," />
        );
    };

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={[20, 20]}>
                <Col span={24} md={8}>
                    <Card title="Doanh thu hôm nay" bordered={false}>
                        <Statistic
                            title="Active Users"
                            value={112893}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Khách hàng mới" bordered={false}>
                        <Statistic
                            title="New Customers"
                            value={5893}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Đơn hàng thành công" bordered={false}>
                        <Statistic
                            title="Successful Orders"
                            value={789}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Chèn thêm biểu đồ vào đây */}
            <div style={{ marginTop: 30 }}>
                <BieuDo />
            </div>
        </div>
    );
};

export default DashboardPage;
