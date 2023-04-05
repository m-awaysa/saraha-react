
import _ from 'lodash'
const paginate = ( users, pageNumber, pageSize ) => {
    const startIndex = pageNumber * pageSize;

    return _(users).slice(startIndex).take(pageSize).value();
}

export default paginate