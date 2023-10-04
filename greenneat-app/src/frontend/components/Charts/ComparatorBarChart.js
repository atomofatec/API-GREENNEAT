import React from "react";
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BsThreeDots } from "react-icons/bs";

const data = [
  {
    nome: "Óleo1",
    valor: 6400,
  },
  {
    nome: "Óleo2",
    valor: 1398,
  },
  {
    nome: "Óleo3",
    valor: 9800,
  },
  {
    nome: "Óleo4",
    valor: 3908,
  },
  {
    nome: "Óleo5",
    valor: 4800,
  },
];

function UserActivity() {
  return (
    <Container sx={{ width: '80%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        <div className="activity">
            <div className="info">
                <div>
                <h3>Comparador</h3>
                <span>New Tracks</span>
                </div>
                <div className="filtro">
                <BsThreeDots />
                </div>
            </div>
            <ResponsiveContainer width="40%" height="60%">
                <BarChart data={data}>
                <XAxis dataKey="nome" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar
                    radius={[5, 5, 0, 0]}
                    dataKey="valor"
                    stackId="a"
                    fill="#0E681D"
                />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Container>
  );
}

export default UserActivity;