import styled from "styled-components";
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BarElement,
} from "chart.js";
import { useProductosStore } from "../../../stores/ProductosStore";
import { Device } from "../../../styles/breackpoints";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  BarElement
);

export function Barras() {
  const { dataproductos } = useProductosStore();

  // Verifica si dataproductos es un array y mapea los datos
  const labels = dataproductos.map((producto) => producto.codigointerno);
  const stockData = dataproductos.map((producto) => producto.stock);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Stock",
        data: stockData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Stock de Productos",
      },
    },
  };

  return (
    <Container>
      <section className="content-grafica">
        <div className="card-grafica">
          <Line data={data} options={options} />
        </div>
        <div className="card-grafica">
          <Bar data={data} options={options} />
        </div>
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 40px;
  /* background-color: rgba(225, 108, 50, 0.3); */

  @media ${Device.mobile} {
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
    width: 85vw;
  }
  @media ${Device.laptop} {
    flex-direction: row;
    overflow-y: auto;
    overflow-x: hidden;
    width: 85vw;
  }
  @media ${Device.tablet} {
    flex-direction: row;
    overflow-y: auto;
    overflow-x: hidden;
    width: 85vw;
  }

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #484848;
    border-radius: 10px;
  }
  .content-grafica {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    width: 85vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 40px;
    /* background-color: rgba(89, 232, 87, 0.5); */

    .card-grafica {
      display: flex;
      width: 85vw;
      height: 50vh;
      justify-content: center;
      align-items: center;
      /* margin: 20px 20px; */
    }
  }
`;

export default Barras;
