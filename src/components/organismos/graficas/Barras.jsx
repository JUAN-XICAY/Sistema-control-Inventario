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
  /* display: flex; */
  position: relative;
  width: 100%;
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content-grafica {
    display: flex;
    flex-direction: column;
    gap: 2em;
    width: 100%;

    @media (min-width: ${Device.tablet}) {
      flex-direction: row;
      justify-content: space-between;
      gap: 1.5em;
    }

    .card-grafica {
      width: 100%;
      padding: 1em;
      background-color: ${(props) => props.theme.bgtotal};
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;

      @media (min-width: ${Device.tablet}) {
        width: 48%;
      }

      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
`;

export default Barras;
