import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

function SvgComponent({ color, ...props }: SvgProps) {
  return (
    <Svg fill={color} viewBox="0 0 24 24" {...props}>
      <Path d="M11.11 23a1 1 0 01-.34-.06 1 1 0 01-.65-1.05l.77-7.09H5a1 1 0 01-.83-1.56l7.89-11.8a1 1 0 011.17-.38 1 1 0 01.65 1l-.77 7.14H19a1 1 0 01.83 1.56l-7.89 11.8a1 1 0 01-.83.44z" />
    </Svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
