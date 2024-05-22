import '~/styles/globals.css';
import { LocaleProvider, QueryProvider, ReduxProvider, ThemeProvider } from '~/contexts';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LocaleProvider>
            <ReduxProvider>
                <QueryProvider>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </QueryProvider>
            </ReduxProvider>
        </LocaleProvider>
    );
};

export default Providers;
