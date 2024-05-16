'use client';

import '~/styles/globals.css';
import { QueryProvider, ReduxProvider, ThemeProvider } from '~/contexts';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider>
            <QueryProvider>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </QueryProvider>
        </ReduxProvider>
    );
};

export default Providers;
