import { RouteConfig } from "react-router-config";
import { Redirect } from "react-router-dom";
import ChartPage from "../pages/chart/ChartPage";
import DetailPage from "../pages/detail/DetailPage";

export const ROUTE_CONFIG: RouteConfig[] = [
  {
    path: "/", // 根路由
    exact: true,
    component: DetailPage,
  },
  {
    path: "/chart",
    exact: true,
    component: ChartPage,
  },
  {
    // 路由匹配时，所要执行的渲染方法
    render: () => <Redirect to={"/"} />,
  },
];
