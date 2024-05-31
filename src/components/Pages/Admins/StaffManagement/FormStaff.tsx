import FormField from '~/components/_common/FormField';

const FormStaff = () => {
    return (
        <form action=''>
            <div>
                <div>
                    <FormField title='Tên dịch vụ' type='text' placeholder='Nhập vào tên dịch vụ' require />
                </div>
            </div>
        </form>
    );
};

export default FormStaff;
