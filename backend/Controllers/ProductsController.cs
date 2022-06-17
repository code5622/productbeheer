using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Store.Models;
using Store.Repositories;

namespace Store.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _DataRepository;

        public ProductsController(IProductRepository DataRepository)
        {
            _DataRepository = DataRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            return await _DataRepository.GetAll();
        }


        [Route("greaterthan/{amount}")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> AmountGreaterThan(int amount)
        {
            return await _DataRepository.AmountGreaterThan(amount);
        }
        
        [Route("{id}")]
        [HttpGet]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var entity = await _DataRepository.Get(id);

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Create(Product product)
        {
            var CreatedEntity = await _DataRepository.Add(product);
            return CreatedAtAction("Get", new { id = CreatedEntity.ProductId }, CreatedEntity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Product product)
        {
            var UpdatedEntity = await _DataRepository.Update(product);
            return CreatedAtAction("Get", new { id = UpdatedEntity.ProductId }, UpdatedEntity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(int id)
        {
            var Entity = await _DataRepository.Remove(id);
            return NoContent();
        }
    }
}
