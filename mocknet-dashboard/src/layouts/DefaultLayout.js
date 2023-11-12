import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function DefaultLayout({ children }) {
    return (
        <div>
            <Header>
                <div className='inline-flex gap-1 text-lg'>
                    <div className='font-bold text-gray-400'>MockNet</div>
                    <div className='font-light text-gray-500'>Dashboard</div>
                </div>
            </Header>
            <Content className='px-10 py-5 bg-gray-200 min-h-screen'>
                {children}
            </Content>
            <Footer></Footer>
        </div>
    )
}

export default DefaultLayout