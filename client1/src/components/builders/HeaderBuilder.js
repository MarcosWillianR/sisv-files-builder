import QRCode from "qrcode";
import { format } from "date-fns";

class HeaderBuilder {
  constructor(data) {
    this.data = data;
    this.content = "";
  }

  buildCss(customizationConfig, approvalStatus) {
    return `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,460;1,460&display=swap');

        :root {
          --primary-color: ${customizationConfig.primaryColor};
          --secondary-color: ${customizationConfig.secondColor};
          --text-color: #000;
          --icon-size: 14px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Montserrat', Arial, sans-serif;
          line-height: 1.5;
          font-size: 0.875rem;
          color: var(--text-color);
        }

        .header {
          -webkit-print-color-adjust: exact;
          height: 100px;
          position: absolute;
          top: 0px; 
          left: 0px; 
          right: 0px;
          padding: 4px 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          gap: 12px;
        }

        .logo-container {
            display: flex;
            align-items: center;
        }

        .logo {
            max-height: 40px;
            width: auto;
        }

        .qr-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .qr-code {
            width: 80px;
            height: 80px;
        }

        .info-container {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;
            font-size: 0.75rem;
        }
        
        .wrapper {
          display: flex;
          gap: 12px;
        }

        .info-id {
            font-weight: 600;
        }

        .approvalstatus {
          background-color: ${approvalStatus.color};
          min-width: 274px;
          text-align: center;
          color: #ffffff;
          padding: 4px 12px;
          font-size: 14px;
          border-radius: 999px;
        }

        .info-date, .info-time {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        .icon {
            width: var(--icon-size);
            height: var(--icon-size);
        }
    `;
  }

  async buildHeader(data) {
    const { id, completeDate, file_token, customizationConfig, approvalStatus } = data;
    const logoUrl = customizationConfig?.s3File?.url ?? null;
    const pdfLink = `https://sisv.cardados.com/inspection-link-view/${file_token}`;
    const qrCodeUrl = await QRCode.toDataURL(pdfLink);
    const timePart = completeDate.split(" ")[1];
    const [hours, minutes] = timePart.split(":");

    const formattedDate = format(new Date(completeDate), "dd/MM/yyyy");
    const formattedHour = `${hours}:${minutes}`;

    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Laudo Veículo</title>
              <style>
                ${this.buildCss(customizationConfig, approvalStatus)}
              </style>
          </head>
          <body>
            <header class="header">
              <div class="logo-container">
                <img src=${logoUrl}
                  alt="Logo" class="logo">
              </div>
              <div class="qr-container">
                <img
                  src=${qrCodeUrl}
                  alt="QR Code" class="qr-code">
              </div>
              <div class="info-container">
                <span class="info-id">ID: ${id}</span>
                <div class="wrapper">
                  <span class="info-date">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    ${formattedDate}
                  </span>

                  <span class="info-time">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${formattedHour}
                  </span>
                </div>
                <div class="approvalstatus">
                  ${approvalStatus.name}
                </div>
              </div>
            </header>
          </body>
        </html>
      `;
  }

  async build(data) {
    this.content = await this.buildHeader(data);
    return this.content;
  }

  getContent() {
    return this.content;
  }
}

export default HeaderBuilder;
