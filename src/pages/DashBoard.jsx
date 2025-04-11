import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import InteviewPortal from "./InteviewPortal";
import axios from 'axios';

const DashBoard = () => { 
  const [catagoryTotal, setCatagoryTotal] = useState(0);
  const [subcatagoryTotal, setsubCatagoryTotal] = useState(0);
  const [qandaTotal, setQandATotal] = useState(0);
  
  const [selectedCard, setSelectedCard] = useState(0);

  // ----------------total category count
  const cattotalData = () => {
    axios
      .get('https://interviewback-ucb4.onrender.com/category/count', {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8",
        },
      })
      .then((res) => {

        console.log(res.data.data);
        
        
        setCatagoryTotal(res.data.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //--------------  total subcategory count
  const subcattotallData = () => {
    axios
      .get('https://interviewback-ucb4.onrender.com/subcategory/count', {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setsubCatagoryTotal(res.data.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // --------------------- total questions and answers count
  const qatotalData = () => {
    axios
      .get('https://interviewback-ucb4.onrender.com/questions/count', {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODA4YTE3MzRkZGY2ZjZlZGUyNTRmMSIsImlhdCI6MTc0MjYyMDUwM30._S8-zRqSVebO8IljXmp3vSa-IOpV2_bp-USjSzuVFP8",
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setQandATotal(res.data.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  useEffect(() => {
    cattotalData();
    subcattotallData();
    qatotalData();
  }, []);

  // Cards data with dynamic totals
  const cards = [
    { id: 1, title: 'Total Category', description: catagoryTotal },
    { id: 2, title: 'Total Sub Category', description: subcatagoryTotal },
    { id: 3, title: 'Total Q / A', description: qandaTotal },
  ];

  return (
    <InteviewPortal>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
          gap: 2,
        }}
      >
        {cards.map((card, index) => (
          <Card key={card.id}>
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? '' : undefined}
              sx={{
                height: '100%',
                background: selectedCard === index
                  ? 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)'
                  : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                color: selectedCard === index ? '#fff' : 'inherit',
                '&:hover': {
                  background: selectedCard === index
                    ? 'linear-gradient(135deg, #039be5 0%, #01579b 100%)'
                    : 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ justifyContent: 'center', display: 'flex', fontWeight: 'bold' }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ justifyContent: 'center', display: 'flex', fontWeight: 600 }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </InteviewPortal>
  );
};

export default DashBoard;

