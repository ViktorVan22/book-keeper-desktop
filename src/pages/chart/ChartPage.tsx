import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const ChartPage: React.FC = () => {
  // 定义数据
  const data = [
    { name: "a", uv: 200 },
    { name: "b", uv: 100 },
    { name: "c", uv: 300 },
    { name: "d", uv: 240 },
  ];

  return (
    <div>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
};

export default ChartPage;
