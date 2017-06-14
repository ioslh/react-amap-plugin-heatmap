import React from 'react';

// const configurableProps = [
//   'radius',
//   'gradient',
//   'opacity',
//   'zooms',

//   'visible',
//   'dataset',
// ]
// const allProps = configurableProps;

// const defaultProps = {
//   radius: 30,
// }

class Heatmap extends React.Component {
  constructor(props) {
    super(prpos);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        throw new Error('Heatmap has to be a child of Map component');
      } else {
        this.map = props.__map__;
        this.element = props.__ele__;
        this.createHeatmap(props).then(() => {
          // 初始化创建的时候，如果 visible 为 false 隐藏
          if ((typeof props.visible === 'boolean') && !props.visible) {
            this.heatmap.hide();
          }
          if ('dataSet' in props) {
            this.heatmap.setDataSet(props.dataSet);
          }
        });
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps, props) {

  }

  createHeatmap(props) {
    if (this.heatmap) {
      return new Promise((resolve) => {
        resolve(this.heatmap);
      });
    } else {
      return new Promise((resolve) => {
        this.map.plugin(['AMap.Heatmap'], () => {
          const heatmapOptions = this.buildInitOptions(props);
          this.heatmap = new window.AMap.Heatmap(this.map, heatmapOptions);
          resolve(this.heatmap);
        });
      });
    }
  }

  buildInitOptions(props) {
    const opts = {};
    ['radius', 'gradient', 'opacity', 'zooms'].forEach((key) => {
      if (key in props) {
        opts[key] = props[key];
      }
    });
    return opts;
  }

  render() {
    return null;
  }
}

export default Heatmap;