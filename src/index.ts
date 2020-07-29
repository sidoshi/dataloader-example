import Koa from 'koa';
import Dataloader from 'dataloader';
import { standardCodes, rates } from './mockData';

const app = new Koa();

interface StandardCode {
  _id: string;
  name: string;
}

// An example route that would be called to import a list of rates
// Each rate contains a standard code id, which needs to be fetched from the db
// We use data loader to batch those requests and on the next tick
// we make a single request to the db to fetch all those codes
// This can get a little tricky when error handling comes into play but it would still not be super complicated.
app.use(async ctx => {
  const standardCodeLoader = new Dataloader(
    (standardCodeIds: readonly string[]) =>
      fetchAllStandardCodeIds(standardCodeIds)
  );

  // Register a function to be called on the next tick once the event loop ends.
  process.nextTick(() =>
    console.log(
      'Next tick is starting, now I will load all the batched ids from db'
    )
  );

  const standardCodes = await Promise.all(
    rates.map(rate => standardCodeLoader.load(rate.standardCodeId))
  );

  ctx.body = standardCodes;
});

async function fetchAllStandardCodeIds(
  standardCodeIds: readonly string[]
): Promise<StandardCode[]> {
  console.log(`Fetching ${standardCodeIds.length} standard codes`);
  return standardCodeIds.map(
    standardCodeId =>
      standardCodes.find(code => code._id === standardCodeId) as StandardCode
  );
}

const PORT = 5050;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
