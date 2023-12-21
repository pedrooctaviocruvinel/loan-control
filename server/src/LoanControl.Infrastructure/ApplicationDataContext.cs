using Microsoft.EntityFrameworkCore;

namespace LoanControl.Infrastructure;

public class ApplicationDataContext : DbContext
{
    public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options) { }
}
