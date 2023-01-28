import { useState } from 'react';
import {
  Badge,
  Block,
  Button,
  Callout,
  Card,
  ColGrid,
  Flex,
  Metric,
  ProgressBar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TabList,
  Text,
  Toggle,
  ToggleItem,
} from '@tremor/react';
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { faker } from '@faker-js/faker';

const data: Kpi[] = [
  {
    title: 'Usuarios Registrados',
    quantity: 0,
  },
  {
    title: 'Usuarios',
    quantity: 0,
  },
  {
    title: 'Usuarios',
    quantity: 0,
  },
];

const usersData: User[] = [];

const numOfUsers = 10;
for (let i = 0; i < numOfUsers; i++) {
  usersData.push({
    name: faker.name.fullName(),
    date: faker.date.recent().toString(),
    rama: faker.helpers.arrayElement(['Varonil', 'Femenil']),
    distance: faker.helpers.arrayElement(['25km', '50km'])
  });
}

export default function Home() {
  const [selectedView, setSelectedView] = useState(1);
  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <Metric>Maratón UVAQ 2023</Metric>
      <Flex>
      <Text>
        Visualiza el maratón UVAQ 2023 en nuestro panel de control con estadísticas en tiempo real, resultados y más. Sigue el progreso de tus participantes favoritos y planifica tu próxima carrera. No pierdas detalle con nuestro panel de control.
      </Text>
      <Button>Cerrar sesión</Button>
      </Flex>

      <TabList defaultValue={1} handleSelect={(value) => setSelectedView(value)} marginTop="mt-6">
        <Tab value={1} text="Inicio" />
        <Tab value={2} text="Usuarios registrados" />
      </TabList>

      {selectedView === 1 ? (
        <>
          <ColGrid numColsMd={2} numColsLg={3} marginTop="mt-6" gapX="gap-x-6" gapY="gap-y-6">
            <Card>
              <Flex alignItems="items-start">
                <Block truncate={true}>
                  <Flex>
                    <Text>Registro habilitado</Text>
                    <Toggle
                      defaultValue={1}
                      handleSelect={(value) => console.log(value)}
                    >
                      <ToggleItem value={1} text="Habilitar" />
                      <ToggleItem value={2} text="Deshabilitar" />
                    </Toggle>

                  </Flex>
                  <Callout
                    title="El sistema está habilitado"
                    text="El registro está corriendo sin problemas en https://mediomaraton.uvaq.edu.mx"
                    icon={CheckCircleIcon}
                    height="h-12"
                    color="teal"
                    marginTop="mt-4"
                  />
                </Block>
              </Flex>
            </Card>
            <Card>
              <Flex alignItems="items-start">
                <Block truncate={true}>
                  <Text>Usuarios registrados</Text>
                  <Metric truncate={true}>{usersData.length}</Metric>
                </Block>
              </Flex>
              <Flex>
                <Text>Actualmente: {usersData.length} corredores</Text>
                <Text>Máximo 500</Text>
              </Flex>
              <ProgressBar percentageValue={(usersData.length / 500) * 100} color="blue" marginTop="mt-2" />
            </Card>
          </ColGrid>
        </>
      ) : (
        <Block marginTop="mt-6">
          <Card>

            <Flex justifyContent="justify-start" spaceX="space-x-2">
              <Metric>Usuarios registrados</Metric>
              <Badge text={usersData.length.toString()} color="gray" />
            </Flex>
            <Table marginTop="mt-6">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Rama</TableHeaderCell>
                  <TableHeaderCell>Fecha de Nacimiento</TableHeaderCell>
                  <TableHeaderCell>Distancia</TableHeaderCell>
                  <TableHeaderCell>Acción</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {usersData.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.rama}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.distance}</TableCell>
                    <TableCell>
                      <Button
                        size="md"
                        importance="secondary"
                        onClick={() => console.log("clicked")}
                      >
                        View more
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Block>
      )}
    </main>
  );
}
