import { Box, Button, Heading } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { BACKEND_HOST_API } from "../../../Constants";

const DownloadReport = (props: DownloadReportProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div
      style={{
        border: "1px solid teal",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
      }}
    >
      <Box style={{ marginBottom: "30px" }}>
        <Heading>Generate Report</Heading>
        Select Date range
        <br />
        <b>Start date: </b>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <b>End date: </b>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </Box>
      <a
        href={`${BACKEND_HOST_API}/download_report/${
          props.hash
        }?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`}
        download="WeatherReport"
        target="_blank"
      >
        <Button backgroundColor={"green"} color={"white"}>
          Download Report for {props.cityName.toUpperCase()}
        </Button>
      </a>
    </div>
  );
};

export default DownloadReport;
