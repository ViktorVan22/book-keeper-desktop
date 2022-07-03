import { Layout, Menu, Statistic } from "antd";
import { Moment } from "moment";
import { FC, useContext } from "react";
import { renderRoutes } from "react-router-config";
import { Link, useLocation } from "react-router-dom";
import { getSummary } from "../../services/recordHelper";
import { ROUTE_CONFIG } from "../../services/router";
import Icon from "../icon/Icon";
import LocaleDatePicker from "../localeDatePicker/LocaleDatePicker";
import Logo from "../logo/Logo";
import { Context } from "../provider/Provider";
import { updateMonth } from "../provider/reducer/actions";
import "./MainLayout.css";

const { Sider, Content } = Layout;
const { Item } = Menu;

const MainLayout: FC = () => {
  // 获取上层Provider所传递的state和dispatch
  const { state, dispatch } = useContext(Context);

  // 使用之前已经定义的方法计算总收入和总支出
  const monthlySummary = getSummary(state.monthlyRecords);

  // 在更改所选月份后更改全局状态
  const onMonthChange = (month: Moment) => {
    dispatch(updateMonth(month));
  };

  const { pathname } = useLocation();
  return (
    <Layout className="app">
      <Sider className="sider" theme="light" collapsible>
        <Logo />
        <Menu defaultSelectedKeys={[pathname]}>
          <Item key="detail" icon={<Icon icon={"icon-zhuye"} />}>
            <Link to="/">明细</Link>
          </Item>
          <Item key="chart" icon={<Icon icon={"icon-Chart"} />}>
            <Link to="/chart">图表</Link>
          </Item>
        </Menu>
      </Sider>
      <Content className="content">
        <div className={"header"}>
          <div className={"header-category"}>
            <Statistic
              title={"请选择月份"}
              valueRender={() => (
                <LocaleDatePicker
                  value={state.month}
                  onChange={onMonthChange}
                />
              )}
            />
            <Statistic title={"总收入"} value={monthlySummary.totalIncome} />
            <Statistic
              title={"总支出"}
              value={monthlySummary.totalExpenditure}
            />
          </div>
        </div>
        <div className="body">{renderRoutes(ROUTE_CONFIG)}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
