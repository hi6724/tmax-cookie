import Reserve from '../components/Reserve';
import TmaxInfo from '../components/TmaxInfo';
import { COOKIE, REQUEST_LIST_DATA } from '../constants';

async function page() {
  return (
    <div className='w-screen '>
      <div className='w-full'>
        <TmaxInfo cookie={COOKIE} />
        <Reserve requestData={REQUEST_LIST_DATA} />
      </div>
    </div>
  );
}

export default page;
