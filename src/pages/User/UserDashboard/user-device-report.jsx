/* eslint-disable react/prop-types */
import Chart from "react-apexcharts";

// const UserDeviceReport = ({ height = 400 }) => {
//   const series = [1243, 800, 400, 607, 315, 640];

//   const options = {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//     },
//     labels: [
//       "Organic Search",
//       "Paid Search",
//       "Direct",
//       "Organic Social",
//       "Referral",
//       "Email",
//     ],
//     dataLabels: {
//       enabled: false,
//       style: {
//         fontSize: "14px",
//         fontWeight: "500",
//       },
//     },
//     stroke: {
//       width: 0,
//     },
//     colors: [`#155EEF`, "#6CF4BB", "#E62E05", "#444CE7", "#BA24D5", "#ACDC79"],
//     tooltip: {
//       theme: "dark",
//     },
//     padding: {
//       top: 0,
//       right: 0,
//       bottom: 0,
//       left: 0,
//     },
//     legend: {
//       position: "bottom",
//       labels: {
//         colors: `#51525C`,
//       },
//     },
//   };
//   return (
//     <>
//       <Chart
//         options={options}
//         series={series}
//         type="donut"
//         height={height}
//         width={"100%"}
//       />
//     </>
//   );
// };

const UserDeviceReport = ({ height = 405 }) => {
  // const { theme: config, setTheme: setConfig } = useThemeStore();
  // const { theme: mode } = useTheme();
  // const theme = themes.find((theme) => theme.name === config);

  const series = [900, 800];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Rooms", "Apartment"],
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    stroke: {
      width: 0,
    },
    colors: ["#FFBC40", "#FD7658"],
    tooltip: {
      theme: "light",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            style: {
              fontSize: "12px",
              fontWeight: 500,
              color: "#E62E05",
            },
            value: {
              color: "#000",
              fontSize: "32px",
              fontWeight: 700,
            },
            total: {
              show: true,
              color: "#999999",
              fontSize: "16px",
            },
          },
        },
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "#000  ",
      },
    },
  };

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="donut"
        height={height}
        width={"100%"}
      />
    </>
  );
};
export default UserDeviceReport;
