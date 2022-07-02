import Icon from "../icon/Icon";
import "./Logo.css";

interface LogoProps {
  size?: "large" | "default"; // large是为主题头部使用时准备的size
}

const Logo: React.FC<LogoProps> = ({ size = "default" }) => {
  return (
    <div className={`logo logo-${size}`}>
      <Icon icon={"icon-bookkeeping"} />
      <span>一步记账</span>
    </div>
  );
};

export default Logo;
