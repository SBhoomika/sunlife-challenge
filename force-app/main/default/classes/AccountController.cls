public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
   public static List<Account> getAccounts( String searchKey, String sortBy, String sortDirection) {
      
       String query = 'SELECT Id, Name, Owner.Name, Phone, Website, AnnualRevenue FROM Account WHERE Industry = \'Financial Services\'';
       if ( searchKey != null && searchKey != '' ) {
           String key = '%' + searchKey + '%';
           query += ' AND Name LIKE :key';
       }
       query += ' WITH SECURITY_ENFORCED';

       if ( sortBy != null && sortDirection != null ) {
           if(sortBy == 'OwnerName') {
            query += ' ORDER BY Owner.Name ' + sortDirection;
           }else {
               query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
           }
       }
       return Database.query( query );
   }
}