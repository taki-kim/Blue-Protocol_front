const printHtml = (input: string): string => {
  switch (input) {
    case 'h1':
      return '<h1 style=""></h1>';
    case 'h2':
      return '<h2 style=""></h2>';
    case 'h3':
      return '<h3 style=""></h3>';
    case 'div':
      return '<div style=""></div>';
    case 'br':
      return '<br/>';
    case 'red-font':
      return '<span style="color:#D51E1E; font-weight:600;"></span>';
    case 'blue-font':
      return '<span style="color:#68c3c4; font-weight:600;"></span>';
    case 'toggle':
      return `<details>
<summary style="font-weight:700;">제목입력</summary>
<div style="background-color:#FAFAFA; padding: 2rem; border-radius: 1rem">
본문
</div>
</details>`;
    default:
      return '';
  }
};

export default printHtml;
