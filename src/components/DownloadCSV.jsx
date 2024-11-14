import PropTypes from 'prop-types';
import {FileDownloadOutlined} from '@mui/icons-material';
import {Button} from '@mui/material';

const DownloadCSV = ({ data, filename = 'data.csv' }) => {

  // Function to convert JSON data to CSV format
  const convertToCSV = (data) => {
    if (!data || !data.length) {
      return '';
    }
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];

    for (const row of data) {
      const values = headers.map((header) => JSON.stringify(row[header] ?? ''));
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  // Function to trigger the CSV download
  const downloadCSV = () => {
    const csv = convertToCSV(data);
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(csvUrl);
  };

  return (

    <Button
  variant="outlined"
  color="secondary" // Change to any MUI color: 'primary', 'secondary', 'success', etc.
  onClick={downloadCSV}
  startIcon={<FileDownloadOutlined />}
  sx={{
    color: "#FF5722", // Custom text color
    borderColor: "#FF5722", // Custom border color
    padding: "8px 15px",
    fontSize: "14px",
    borderRadius: "30px",
    "&:hover": {
      borderColor: "#FF5722",
      backgroundColor: "#FFE0B2", // Custom hover background color
      color: "#E64A19",
      transform: "scale(1.05)",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
  }}
>
  Download CSV
</Button>
  )
};

DownloadCSV.propTypes = {
    data: PropTypes.array.isRequired,
    filename: PropTypes.string,
    };

export default DownloadCSV;
