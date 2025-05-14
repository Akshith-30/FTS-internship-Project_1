package com.fts.e_commerce.model;

public class Customer {


    public int customerId;
    public String customerName;
    public String customerAddress;
    public String customerPhn;

    public String getCustomerPhn() {
        return customerPhn;
    }

    public void setCustomerPhn(String customerPhn) {
        this.customerPhn = customerPhn;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }

    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }
}
