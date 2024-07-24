import { COOKIE_SEO, REQUEST_LIST_DATA_SEO } from '../constants';
import TmaxInfo from '../components/TmaxInfo';
import Reserve from '../components/Reserve';

async function page() {
  return (
    <div className='w-screen '>
      <div className='w-full'>
        <TmaxInfo cookie={COOKIE_SEO} />
        <Reserve requestData={REQUEST_LIST_DATA_SEO} />
      </div>
    </div>
  );
}

export default page;
