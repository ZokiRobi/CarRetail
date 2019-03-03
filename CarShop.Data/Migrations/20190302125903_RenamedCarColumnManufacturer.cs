using Microsoft.EntityFrameworkCore.Migrations;

namespace CarShop.Data.Migrations
{
    public partial class RenamedCarColumnManufacturer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CarManuFacuterName",
                table: "Cars",
                newName: "CarManufacturerName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CarManufacturerName",
                table: "Cars",
                newName: "CarManuFacuterName");
        }
    }
}
