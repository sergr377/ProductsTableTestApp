import { css } from '@emotion/react';
import { JSX } from 'react';
import icons from '../../accets';
import styled from '@emotion/styled';

export type ISize = 'xs' | 'sm' | 'md' | 'xm' | 'm' | 'lg' | 'xl' | 'xxl' | 'auto';
export type IconName = keyof typeof icons;

export interface IIconElementProps {
  size?: ISize;
  name: IconName;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  fill?: string;
  /** Оставить дефолтную заливку (не переопределять fill) */
  defaultFill?: boolean;
  hoverColor?: string;
}

const sizeStyles: Record<ISize, ReturnType<typeof css>> = {
  auto: css`
    width: auto;
    height: auto;
  `,
  lg: css`
    width: 24px;
    height: 24px;
  `,
  m: css`
    width: 40px;
    height: 40px;
  `,
  md: css`
    width: 16px;
    height: 16px;
  `,
  sm: css`
    width: 14px;
    height: 14px;
  `,
  xl: css`
    width: 60px;
    height: 60px;
  `,
  xm: css`
    width: 32px;
    height: 32px;
  `,
  xs: css`
    width: 8px;
    height: 8px;
  `,
  xxl: css`
    width: 80px;
    height: 80px;
  `,
};

const StyledIcon = styled.div<{
  size: ISize;
  fill?: string;
  defaultFill?: boolean;
  hoverColor?: string;
}>`
  ${({ size }) => sizeStyles[size]}
  display: flex;
  align-items: center;
  & > path {
    fill: ${({ defaultFill, fill }) => (!defaultFill ? fill || 'currentColor' : undefined)};
  }
  & > circle {
    fill: ${({ fill }) => fill || 'currentColor'};
  }
  &:hover {
    color: ${({ hoverColor }) => hoverColor ?? 'currentColor'};
  }
`;

export const IconElement = ({
  className,
  defaultFill,
  fill,
  hoverColor,
  name,
  onClick,
  size = 'auto',
  ...props
}): JSX.Element => {
  const Icon = icons[name];
  return (
    <StyledIcon
      {...props}
      size={size}
      style={{ display: 'flex' }}
      as={Icon}
      onClick={onClick}
      className={className}
      fill={fill}
      defaultFill={defaultFill}
      hoverColor={hoverColor}
    />
  );
};
