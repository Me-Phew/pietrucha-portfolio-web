const getFileSize = (numberOfBytes: number | undefined) => {
  if (numberOfBytes === undefined) {
    return 0;
  }

  if (numberOfBytes < 1024) {
    return `${numberOfBytes} bytes`;
  } else if (numberOfBytes >= 1024 && numberOfBytes < 1048576) {
    return `${(numberOfBytes / 1024).toFixed(1)} KB`;
  } else if (numberOfBytes >= 1048576) {
    return `${(numberOfBytes / 1048576).toFixed(1)} MB`;
  }
};

const printCreatorMessage = () => {
  if (navigator.userAgent.toLowerCase().includes('chrome')) {
    const n = [
      `
    %c Made with \u2665 by MePhew %c https://github.com/Me-Phew`,
      'color: #080808; background: #69f24a; padding:5px 0;',
      'color: #fff; background: #1c1c1c; padding:5px 0;',
    ];
    window.console.log.apply(console, n);
  } else
    window.console && window.console.log('Made with \u2665 by MePhew - https://github.com/Me-Phew');
};

const logWarningPropValidationFailed = (message: string) => {
  console.warn(`Prop validation failed: ${message}`);
};

export { getFileSize, printCreatorMessage, logWarningPropValidationFailed };
