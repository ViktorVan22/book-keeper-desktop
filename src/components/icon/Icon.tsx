import React, { FC } from "react";
import classNames from "classnames";

import "./Icon.css";
import { Button } from "antd";

interface IconProps {
  icon: string;
  className?: string;
}

const Icon: FC<IconProps> = ({ icon, className }) => {
  return (
    <svg className={classNames("icon", className)}>
      <use xlinkHref={`#${icon}`} />
    </svg>
  );
};

export default Icon;

export const IconButton: React.FC<
  IconProps & { onClick?: React.MouseEventHandler<HTMLElement> }
> = ({ icon, className, onClick }) => {
  return (
    <Button
      shape="circle"
      className={className}
      icon={<Icon icon={`${icon}`} />}
      onClick={onClick}
    />
  );
};
