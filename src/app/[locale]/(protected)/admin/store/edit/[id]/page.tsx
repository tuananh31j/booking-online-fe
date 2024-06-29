import DetailStorePage from '~/components/pages/Admins/StoreManagement/DetailStorePage';

export default function DetailStore({ params }: { params: { id: number } }) {
    return <DetailStorePage params={params} />;
}
