import React from 'react';

import { PanelCard, Subtitle, Text } from '@/shared/components';

const LinesProducts = () => {
    return (
        <div className="my-16 flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4">
                <Subtitle variant="xl">Nuestras Líneas de Productos</Subtitle>
                <Text size="xl" variant="secondary" className="max-w-xl text-center">
                    Soluciones especializadas para cada necesidad náutica
                </Text>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <PanelCard className="flex flex-col gap-4 p-8">
                    <Text variant="secondary" className="text-center">
                        <span className="text-4xl">🔥</span>
                    </Text>
                    <Subtitle variant="lg" className="text-center">
                        Calefactores Diesel
                    </Subtitle>
                    <Text variant="secondary" className="text-center">
                        Sistemas de calefacción eficientes para embarcaciones y espacios cerrados.
                    </Text>
                </PanelCard>
                <PanelCard className="flex flex-col gap-4 p-8">
                    <Text variant="secondary" className="text-center">
                        <span className="text-4xl">🔋</span>
                    </Text>
                    <Subtitle variant="lg" className="text-center">
                        Cargadores de Batería
                    </Subtitle>
                    <Text variant="secondary" className="text-center">
                        Cargadores inteligentes para todo tipo de baterías náuticas
                    </Text>
                </PanelCard>
                <PanelCard className="flex flex-col gap-4 p-8">
                    <Text variant="secondary" className="text-center">
                        <span className="text-4xl">⚓</span>
                    </Text>
                    <Subtitle variant="lg" className="text-center">
                        Accesorios Náuticos
                    </Subtitle>
                    <Text variant="secondary" className="text-center">
                        Componentes y accesorios especializados para embarcaciones
                    </Text>
                </PanelCard>
                <PanelCard className="flex flex-col gap-4 p-8">
                    <Text variant="secondary" className="text-center">
                        <span className="text-4xl">⚡</span>
                    </Text>
                    <Subtitle variant="lg" className="text-center">
                        Sistemas Eléctricos
                    </Subtitle>
                    <Text variant="secondary" className="text-center">
                        Soluciones eléctricas completas para aplicaciones marinas.
                    </Text>
                </PanelCard>
            </div>
        </div>
    );
};

export default LinesProducts;
