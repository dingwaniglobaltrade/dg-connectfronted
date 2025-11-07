const userFieldConfig = {
  retailer: {
    personalInfo: [
      { label: "Firm Name", key: "firmName" },
      { label: "Concern Person Name", key: "contactPerson" },
      { label: "GSTIN Number", key: "gstNumber" },
      { label: "Route Name", key: "routeName" },
      { label: "Assigned Distributor Name", key: "assignedDistributorName" },
      { label: "Created By", key: "createdBy" },
    ],
    contactInfo: [
      { label: "Email Address", key: "email" },
      { label: "Mobile Number", key: "phone" },
      { label: "Address", key: "address" },
    ],
  },
  distributor: {
    personalInfo: [
      { label: "Company Name", key: "companyName" },
      { label: "Owner Name", key: "ownerName" },
      { label: "GSTIN Number", key: "gstNumber" },
      { label: "Region Covered", key: "region" },
      { label: "Total Retailers Assigned", key: "retailerCount" },
      { label: "Created By", key: "createdBy" },
    ],
    contactInfo: [
      { label: "Email Address", key: "email" },
      { label: "Phone Number", key: "phone" },
      { label: "Office Address", key: "address" },
    ],
  },
  salesperson: {
    personalInfo: [
      { label: "Full Name", key: "name" },
      { label: "Employee ID", key: "employeeId" },
      { label: "Assigned Route", key: "routeName" },
      { label: "Assigned Distributor", key: "assignedDistributorName" },
      { label: "Created By", key: "createdBy" },
    ],
    contactInfo: [
      { label: "Email Address", key: "email" },
      { label: "Phone Number", key: "phone" },
      { label: "Address", key: "address" },
    ],
  },
};
