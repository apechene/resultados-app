import React, { useEffect, useState } from "react";
import { format, subDays, parseISO, getDay } from "date-fns";


const TableroLoterias = () => {
  const [resultados, setResultados] = useState([]);

  // Lista de loterías permitidas
  const loteriasPermitidas = ["BOGOTA", "BOYACA", "CAUCA", "SAMAN","VALLE",
     "MANIZALES","CRUZ ROJA","HUILA","CUNDINAMARCA",
     "TOLIMA","QUINDIO","MEDELLIN","RISARALDA","ASTRO LUNA","CHONTICO FESTIVO", "SAMANFESTIVO","SAMAN FESTIVO","CHONTICO DIA FESTIVO","CHONTICO DIA"];

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const hoy = subDays(new Date(), 1);
        const ultimos7Dias = Array.from({ length: 7 }).map((_, i) =>
          format(subDays(hoy, i), "yyyy-MM-dd")
        );
       

        const resultadosPromises = ultimos7Dias.map(async (fecha) => {
          const response = await fetch(`https://api-resultadosloterias.com/api/results/${fecha}`);
          const { data } = await response.json();
          return data;
        });

        const resultadosData = await Promise.all(resultadosPromises);
        const resultadosFiltrados = resultadosData.flat().filter((resultado) =>
          loteriasPermitidas.includes(resultado.lottery));

        const resultadosUnicos = resultadosFiltrados.reduce((acc, resultado) => {
          const key = `${resultado.date}-${resultado.lottery}`;
          if (!acc[key]) {
            acc[key] = resultado;
          }
          return acc;
        }, {});

        setResultados(Object.values(resultadosUnicos));
      } catch (error) {
        console.error("Error al obtener los resultados", error);
      }
    };

    fetchResultados();
  }, []);

  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchResultados();
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds

    return () => clearInterval(intervalId);
    console.log(intervalId);
  }, []);

  return (
   
    <div className="container mt-4">
       <h1 className="text-center">Resultado de Loterías</h1>
      <div className="row">
        {Array.from({ length: 8 }).map((_, index) => {
          const fecha = format(subDays(new Date(), index), "yyyy-MM-dd");
          const diaSemana = diasSemana[getDay(parseISO(fecha))];
          const loteriasDelDia = resultados.filter((resultado) => resultado.date === fecha);
        
          return (
            <div key={fecha} className="col text-center border p-2">
              <h5 className="fw-bold">{diaSemana} </h5>
              <p>{fecha}</p>
              {loteriasDelDia.length > 0 ? (
                loteriasDelDia.map((loteria, idx) => (
                  <div key={idx} className="card mt-2">
                    <div className="card-body p-0 text-center">
                      <p className="fw-semibold mb-1">{loteria.lottery}</p>
                      <p className="fs-4 mb-0 fw-bold text-danger">{loteria.result}</p>
                      <p className="text-muted">Serie: {loteria.series}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">Sin resultados</p>
              )}
            </div>
          );
        })}
        <div className="col-12 text-center mt-4">
          <video width="" height="240" autoPlay loop muted>
            <source src="./intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default TableroLoterias;

