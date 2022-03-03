import { LightningElement, wire, api, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';

import getAccounts from '@salesforce/apex/AccountController.getAccounts';



const columns = [
    { label: 'Account Name', fieldName: 'Name', editable: true, sortable: true },
    { label: 'Account Owner', fieldName: 'OwnerName', editable: true, sortable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Website', fieldName: 'Website' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue' }
];
export default class LightningDatatableExample extends LightningElement {
    @track value;
    @track error;
    @track data;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    result;
    
  
    @wire(getAccounts, {searchKey: '$searchKey', sortBy: '$sortedBy', sortDirection: '$sortedDirection'})
    wiredAccounts({ error, data }) {
        if (data) {
            this.data = data.map(o => ({...o, OwnerName: o.Owner.Name}));
            this.endingRecord = this.pageSize;
            this.columns = columns;

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }
    
    sortColumns( event ) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        return refreshApex(this.result);
        
    }
  
    handleKeyChange( event ) {
        this.searchKey = event.target.value;
        return refreshApex(this.result);
    }

    // TODO handleUpdate

}