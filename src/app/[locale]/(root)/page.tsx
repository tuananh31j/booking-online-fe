import BookingProcess from '~/components/elements/BookingProcess';
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations('Header');

    return (
        <>
            <h1>{t('contact')}</h1>
            {/* <BookingProcess /> */}
        </>
    );
}
