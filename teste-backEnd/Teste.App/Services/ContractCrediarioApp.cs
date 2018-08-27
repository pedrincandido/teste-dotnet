using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using Teste.App.viewModel;
using Teste.Domain.Entities;
using Teste.Domain.Repositories;

namespace Teste.App.Services
{
    public class ContractCrediarioApp
    {
        private IRepository<Crediario> _rep;
        private ContractSaleApp _appSale;
        private ContractPersonApp _appPerson;

        public ContractCrediarioApp(IRepository<Crediario> rep, ContractSaleApp appSale, ContractPersonApp appPerson)
        {
            _rep = rep;
            _appSale = appSale;
            _appPerson = appPerson;
        }

        public virtual List<CrediarioViewModel> GetAll()
        {
            var sales = _appSale.GetAll(null);

            var crediarios = _rep.GetAll(null);

            
            var result = (from cre in crediarios
                              //from y in sales.Where(s => s.CreadiarioId == cre.Id).DefaultIfEmpty()
                          join y in sales on cre.Id equals y.CreadiarioId
                          select new CrediarioViewModel
                          {
                              Id = cre.Id,
                              PersonId = cre.PersonId,
                              UserId = cre.UserId,
                              Sales = y == null ? null : new List<SaleViewModel>
                              {
                                  new SaleViewModel
                                  {
                                      Id = y.Id,
                                      Value = y.Value,
                                      PurchaseDate = y.PurchaseDate,
                                      EnableSale = y.EnableSale,
                                      CreadiarioId = y.CreadiarioId.Value
                                  }
                              }
                          }).ToList();

            return result;
        }

        public virtual Crediario GetById(int id)
        {
            try
            {
                var entity = _rep.Get(id);

                Crediario crediario = new Crediario
                {
                    Id = entity.Id,
                    PersonId = entity.PersonId,
                    UserId = entity.UserId,
                    Sales = entity.Sales
                };

                return crediario;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetAtivos()
        {
            try
            {

                return _rep.GetAll(null).Where(x => x.EnableCrediario == true).ToList().Count();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public virtual Crediario SaveCrediario(CrediarioViewModel modelView)
        {
            try
            {

                Crediario entity = new Crediario
                {
                    PersonId = modelView.PersonId,
                    UserId = modelView.UserId,
                    EnableCrediario = modelView.EnableCrediario
                };
                _rep.Insert(entity);

                if (modelView.Sales != null && modelView.Sales.Count() > 0)
                {
                    modelView.Sales.ToList().ForEach(x => _appSale.SaveSale(new SaleViewModel { Value = x.Value, EnableSale = x.EnableSale, PurchaseDate = x.PurchaseDate, CreadiarioId = entity.Id }));
                }
                return entity;
            }
            catch (Exception ex)
            {
                throw new ValidationException();
            }

        }

        public virtual Crediario EditCrediario(CrediarioViewModel view)
        {
            try
            {
                List<Sale> sale = new List<Sale>();
                for (int i = 0; i < view.Sales.Count(); i++)
                {
                    sale.Add(new Sale
                    {
                        Id = (int)view.Sales[i]?.Id.Value,
                        CreadiarioId = (int)view?.Sales[i]?.CreadiarioId,
                        EnableSale = view.Sales[i].EnableSale,
                        PurchaseDate = view.Sales[i].PurchaseDate,
                        Value   = view.Sales[i].Value
                    });
                }
         
                Crediario crediario = _rep.Get(view.Id.Value);

                if (crediario != null)
                {
                    crediario.PersonId = view.PersonId;
                    crediario.UserId = view.UserId;
                    
                    _rep.Update(crediario);
                }

                if (view.Sales != null && view.Sales.Count() > 0)
                {
                    view.Sales.ToList().ForEach(x => _appSale.EditSale(new SaleViewModel { Id = x.Id, Value = x.Value, EnableSale = x.EnableSale, PurchaseDate = x.PurchaseDate, CreadiarioId = crediario.Id }));
                }

                return crediario;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteCrediario(int id)
        {
            Crediario crediario = _rep.Get(id);
            if (crediario != null)
            {
                crediario.EnableCrediario = false;
                _rep.Update(crediario);
            }
        }
    }
}
