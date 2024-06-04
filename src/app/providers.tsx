import '~/styles/globals.css';
import { LocaleProvider, ReduxProvider, ThemeProvider } from '~/contexts';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LocaleProvider>
            <ReduxProvider>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </ReduxProvider>
        </LocaleProvider>
    );
};

export default Providers;
