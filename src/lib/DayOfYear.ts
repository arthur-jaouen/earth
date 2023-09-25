import { PluginFunc } from 'dayjs';

const FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';

export const dayOfYear: PluginFunc = (_, DayJs) => {
  const oldFormat = DayJs.prototype.format;

  DayJs.prototype.format = function (formatStr) {
    if (!this.isValid()) {
      return oldFormat.bind(this)(formatStr);
    }

    const str = formatStr || FORMAT_DEFAULT;
    const result = str.replace(/\[([^\]]+)]|DOY/g, (match) => {
      switch (match) {
        case 'DOY':
          return (
            Math.floor((this.startOf('day').unix() - this.startOf('year').unix()) / 86_400) + 1
          ).toString();
        default:
          return match;
      }
    });

    return oldFormat.bind(this)(result);
  };
};
