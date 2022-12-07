using Countdown.Models;
using Microsoft.AspNetCore.Mvc;

namespace Countdown.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        [Route("GetStartDate")]
        public StartDateCountdown GetStartDate()
        {
            StartDateCountdown sdcd = new()
            {
                StartDate = DateTime.Now,
                IsCountingDown = true
            };

            return sdcd;
        }

        [HttpGet]
        public IEnumerable<Inventory> GetInventory()
        {
            List<Inventory> inventory = new List<Inventory>
            {
                new Inventory { Description = "Tables", Count = 5 },
                new Inventory { Description = "Chairs", Count = 25 }
            };

            return inventory;
        }

        [HttpPost]
        [Route("CountDownEnds")]
        public void CountDownEnds()
        {
            StartDateCountdown sdcd = new()
            {
                StartDate = null,
                IsCountingDown = false
            };
        }
    }
}


