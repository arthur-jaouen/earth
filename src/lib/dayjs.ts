import { PluginFunc } from 'dayjs';

const FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';

export const dayOfYear: PluginFunc = (_, DayJs) => {
  const oldFormat = DayJs.prototype.format;

  DayJs.prototype.format = function (formatStr) {
    const self = this;

    if (!self.isValid()) {
      return oldFormat.bind(self)(formatStr);
    }

    const str = formatStr || FORMAT_DEFAULT;
    const result = str.replace(/\[([^\]]+)]|DOY/g, (match) => {
      switch (match) {
        case 'DOY':
          return (
            Math.floor((self.startOf('day').unix() - self.startOf('year').unix()) / 86_400) + 1
          ).toString();
        default:
          return match;
      }
    });

    return oldFormat.bind(self)(result);
  };
};
