function buildInspectionData(jsonData) {
    if (!jsonData || !Array.isArray(jsonData.inspections)) {
      return [];
    }

    const inspections = jsonData.inspections.map(inspection => ({
      id: inspection.id,
      unit: inspection.unit.name,
      unit_email: inspection.unit.email,
      cnpj: inspection.unit.cnpj,
      productName: inspection.product.name,
      productType: inspection.product.inspectionType,
      expertName: inspection.expertFullName,
      analystName: inspection.analystFullName ?? "N/A", 
      clientName: inspection.clientFullName,
      unitName: inspection.unit?.name ?? "N/A", 
      productName: inspection.product?.name ?? "N/A",
      groups: inspection.product.groupNames.join(', '),
      status: inspection.status,
      paymentStatus: jsonData.status,
      networkUnitaryPrice: inspection.networkUnitaryPrice,
      unitUnitaryPrice: inspection.unitUnitaryPrice,
      clientUnitaryPrice: inspection.clientUnitaryPrice,
      completeDate: inspection.completeDate
    }));

    const inspectionColumns = [
      { label: "ID", key: "id" },
      { label: "UNIDADE", key: "unit" },
      { label: "CNPJ", key: "cnpj" },
      { label: "VISTORIA", key: "productName"},
      { label: "STATUS_VISTORIA", key: "status" },
      { label: "TIPO_SERVICO", key: "productType"},
      { label: "GRUPOS", key: "groups"},
      { label: "CLIENTE", key: "clientName" },
      { label: "ANALISTA", key: "analystName" },
      { label: "STATUS_PAGAMENTO", key: "paymentStatus" },
      { label: "DATA DE CONCLUSÃO", key: "completeDate" }
    ];

    return {inspections, inspectionColumns}
  }

  module.exports = {buildInspectionData}
  