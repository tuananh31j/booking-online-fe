'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

const BreadCrumbComponent = () => {
    const paths: string = usePathname();
    const pathNames: string[] = paths.split('/').filter((path: string) => path);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* <BreadcrumbItem>
                    <BreadcrumbLink href='/admin' asChild>
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathNames.length > 0 && <BreadcrumbSeparator />} */}

                {pathNames.map((pathName: string, index: number) => {
                    const href: string = `/${pathNames.slice(0, index + 1).join('/')}`;
                    const linkName: string = pathName[0].toUpperCase() + pathName.slice(1, pathName.length);
                    const isLastPath: boolean = pathNames.length === index + 1;
                    const isEditItem: boolean = pathName.toLowerCase() === 'edit';

                    return (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                {!isLastPath ? (
                                    <BreadcrumbLink href={href}>
                                        {isEditItem ? <BreadcrumbPage>{linkName}</BreadcrumbPage> : <p>{linkName}</p>}
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{linkName}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>

                            {pathNames.length !== index + 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumbComponent;
